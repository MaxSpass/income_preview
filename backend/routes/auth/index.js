const argon = require('argon2');
const jwt = require('jsonwebtoken');
const PasswordValidator = require('password-validator');
const EmailValidator = require('email-validator');
const express = require('express');
const {authModel} = require('../../modules/models/index');
const {merge, uniqWith, uniq, isObject, pick} = require('lodash');
const AuthModel = require('../../modules/models/auth/index.model');

class ExternalValidateModule extends PasswordValidator {
    static get validateEmail() {
        return EmailValidator.validate;
    }
};

//@TODO Requirements !!!
class InternalValidateModule extends ExternalValidateModule {
    constructor() {
        super();
        this.pass_min = 6;
        this.pass_max = 20;
    }

    static getPassSimilarityErrors(pass, pass_confirm) {
        return [
            ...(pass !== pass_confirm ? ["Passwords don't match"] : [])
        ]
    };

    static getEmailErrors(email) {
        return InternalValidateModule.validateEmail(email) ? [] : ['Email is invalid'];
    };

    getPassErrors(errors) {
        const error_diapazone = `Password should be ${this.pass_min} - ${this.pass_max} characters`;

        const errors_obj = {
            min: error_diapazone,
            max: error_diapazone,
            digits: "Password should contain numbers",
            spaces: "Password should be without spaces",

        };

        const errorsUniq = uniqWith(errors, (el, el2) => {
            const isFirstMinOrMax = (el === 'min' || el === 'max');
            const isSecondMinOrMax = (el2 === 'min' || el2 === 'max');
            return (isFirstMinOrMax && isSecondMinOrMax)
        });

        return errorsUniq.map(el=>errors_obj[el]);
    }

    getValidateErrors(password) {
        // const validator = new PasswordValidator();
        const {pass_min: min, pass_max: max} = this;
        // let promise;

        this
            .is().min(min)
            .is().max(max)
            .has().digits()
            .has().not().spaces();

        const errors = this.validate(password, { list: true });
        const errors_messages = this.getPassErrors(errors);

        return [
            ...(errors_messages.length ? errors_messages : [])
        ]
    };
};

class AuthController {
    getUserByProps(props) {
        return AuthModel.findOne(props)
    }
    createUserByProps(props) {
        return AuthModel.create(props)
    }
};


class AuthModule extends InternalValidateModule {

    constructor(props) {
        super(props);
        this.pass_signature = props.pass_signature || "some_default_signature";
        this.token_expiration = props.token_expiration || "16h"; // "15m", "5s", "6h"

        this.controller = new AuthController();
    }

    static getHashedPassword(password) {
        return argon.hash(password);
    }

    static generateToken(user, signature, props) {
        const data = pick(user, ['_id','first_name','last_name','email']);
        return jwt.sign({ data, }, signature, props);
    }

    static verifyToken(token, signature) {
        return jwt.verify(token, signature)
    }

    static verifyPassword(existPass, pass) {
        return argon.verify(existPass, pass)
    }

    async register(req) {
        const {password, password_confirm, email, first_name, last_name} = req.body;
        let status;
        let response;
        let errors = [];

        const errors_pass_similar = AuthModule.getPassSimilarityErrors(password, password_confirm);
        const errors_pass_invalid = this.getValidateErrors(password);
        const errors_email = AuthModule.getEmailErrors(email);

        errors = errors_pass_similar.length ? errors_pass_similar : errors_pass_invalid;
        if(errors_email.length) {
            errors = errors.concat(errors_email);
        }

        const existUser = await this.controller.getUserByProps({email});

        if(existUser) {
            errors.push('Please, use another email address');
        }

        if(errors.length) {
            status = 400;
            response = {
                data: null,
                error: {
                    messages: errors,
                },
                status,
            };
        } else {
            const passwordHashed = await AuthModule.getHashedPassword(password);
            //@TODO Add email checking by uniq
            const newUser = await this.controller.createUserByProps({
                password: passwordHashed,
                email,
                first_name,
                last_name
            });
            const token = await AuthModule.generateToken(newUser, this.pass_signature,{expiresIn: this.token_expiration});
            const userTokenData = AuthModule.verifyToken(token, this.pass_signature);
            //@TODO
            status = 200;
            response = {
                data: {
                    user: userTokenData,
                    token: token,
                },
                error: null,
                status,
            }
        }

        return {status, response}
    };

    async login(req) {
        const {email, password} = req.body;
        let status;
        let response;
        let errors = [];

        errors = AuthModule.getEmailErrors(email);
        const existUser = await this.controller.getUserByProps({email});

        if(existUser) {
            //@TODO LOGIN LOGIC
            const correctPassword = await AuthModule.verifyPassword(existUser.password, password);
            if(!correctPassword) {
                errors.push('Incorrect password');
            } else {
                const token = await AuthModule.generateToken(existUser, this.pass_signature, {expiresIn: this.token_expiration});
                let userTokenData;
                try {
                    userTokenData = AuthModule.verifyToken(token, this.pass_signature);
                    status = 200;
                    response = {
                        data: {
                            user: userTokenData,
                            token: token,
                        },
                        status,
                    };
                } catch (e) {
                    status = 403;
                    errors.push("Token has been expired");
                }
            }
        } else {
            errors.push('User does not exist')
        }

        if(errors.length) {
            status = 400;
            response = {
                data: null,
                error: (errors.length ? {messages: errors} : null),
                status,
            };
        }

        return {status, response};
    };

    async profile(req) {
        const errors = [];
        let status;
        let response;
        const {authorization: token} = req.headers;

        let userTokenData;

        if (token) {
            try {
                userTokenData = AuthModule.verifyToken(token, this.pass_signature);

                if(userTokenData) {
                    status = 200;
                    response = {
                        user: userTokenData,
                        status,
                    };
                } else {
                    status = 403;
                    errors.push("Unauthorized!");
                }

            } catch (e) {
                status = 401;
                errors.push("Token has been expired");
            }
        } else {
            status = 403;
            errors.push("No token provided!");
        }

        return {
            status,
            response: {
                ...response,
                error: (errors.length ? {messages: errors} : null),
                status,
            }
        }

    }
};

const auth = new AuthModule({
    pass_signature: 'vn4237b237c12bn893cpbn120p',
    token_expiration: "16h",
});

class ApiAuth {
    constructor(){
        this.router = express.Router();

        this.router.route(`/login`).post(async(req,res)=>{
            const {status, response} = await auth.login.call(auth, req);
            res.status(status).json(response);
        });

        this.router.route(`/registration`).post(async(req,res)=>{
            const {status, response} = await auth.register.call(auth, req);
            res.status(status).json(response);
        });

        this.router.route(`/profile`).get(async(req,res)=>{
            const {status, response} = await auth.profile.call(auth, req);
            res.status(status).json(response);
        });

        return this.router;
    };
}

const api = authModel.map(model=>{
    return {
        root: model.root,
        routes: new ApiAuth(model),
    }
});

module.exports = api;