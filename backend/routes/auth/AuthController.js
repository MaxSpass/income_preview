const AuthModel = require('../../modules/models/auth/index.model');

class AuthController {
    getUserByProps(props) {
        return AuthModel.findOne(props)
    }
    createUserByProps(props) {
        return AuthModel.create(props)
    }
};

module.exports = AuthController;
