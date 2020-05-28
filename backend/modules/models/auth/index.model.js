const mongoose = require('mongoose');
const SchemeAuth = require('../../schemes/auth/index.scheme');
const AuthModel = mongoose.model('Auth', SchemeAuth);

module.exports = AuthModel;