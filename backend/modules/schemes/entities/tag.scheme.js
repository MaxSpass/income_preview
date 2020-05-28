const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeTag = new Schema({
    title: {
        type: String,
        required: true,
        unique: true, // @TODO Is it correct?
        trim: true,
    },
}, {timestamps: true,});

module.exports = SchemeTag;