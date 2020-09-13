const AuthModule = require('./AuthModule');
const express = require('express');

const auth = new AuthModule({
    pass_signature: 'vn4237b237c12bn893cpbn120p',
    token_expiration: "1h", // "15m", "5s", "6h", "16h"
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

module.exports = ApiAuth;