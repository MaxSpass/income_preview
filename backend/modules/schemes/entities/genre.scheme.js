const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeGenre = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps: true,});

module.exports = SchemeGenre;