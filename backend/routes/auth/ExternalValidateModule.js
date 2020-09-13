const PasswordValidator = require('password-validator');
const EmailValidator = require('email-validator');

class ExternalValidateModule extends PasswordValidator {
    static get validateEmail() {
        return EmailValidator.validate;
    }
};

module.exports = ExternalValidateModule;