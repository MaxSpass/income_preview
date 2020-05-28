const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const SchemaDateUTC = require('./date.model'); //@TODO

const SchemeUser = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    // date_birth: SchemaDateUTC, // @TODO
}, {timestamps: true,});

module.exports = SchemeUser;