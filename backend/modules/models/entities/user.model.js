const mongoose = require('mongoose');
const SchemeUser = require('../../schemes/entities/user.scheme');
const User = mongoose.model('User', SchemeUser);

module.exports = User;