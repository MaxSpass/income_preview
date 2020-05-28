const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateUTC = mongoose.model('DateUTC', new Schema({
    date_utc: {
        type: String,
        trim: true,
        validate: {
            validator: (el)=>!!el, //@TODO add correct validation
        }
    }
}, {timestamps: true,}));

module.exports = DateUTC;
