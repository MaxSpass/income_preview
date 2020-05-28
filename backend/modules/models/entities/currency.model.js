const mongoose = require('mongoose');
const SchemeCurrency = require('../../schemes/entities/currency.scheme');
const Currency = mongoose.model('Currency', SchemeCurrency);

module.exports = Currency;