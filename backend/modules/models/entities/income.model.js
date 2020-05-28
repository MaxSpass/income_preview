const mongoose = require('mongoose');
const SchemeIncome = require('../../schemes/entities/income.scheme');
const Income = mongoose.model('Income', SchemeIncome);

module.exports = Income;