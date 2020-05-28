const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

const SchemeSource = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: mongoose.SchemaTypes.Url || String,
        required: true,
        trim: true,
    },
}, {timestamps: true,});

module.exports = SchemeSource;