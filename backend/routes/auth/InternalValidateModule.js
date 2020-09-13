const ExternalValidateModule = require('./ExternalValidateModule');
const {uniqWith} = require('lodash');

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

module.exports = InternalValidateModule;