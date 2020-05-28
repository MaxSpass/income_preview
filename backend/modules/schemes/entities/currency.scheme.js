const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeCurrency = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 3,
    },
    icon: {
        type: String,
        trim: true,
    },
}, {timestamps: true,});

module.exports = SchemeCurrency;