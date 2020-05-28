const mongoose = require('mongoose');
const SchemeSource = require('../../schemes/entities/source.scheme');
const Source = mongoose.model('Source', SchemeSource);

module.exports = Source;