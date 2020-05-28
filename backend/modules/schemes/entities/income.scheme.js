const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {NOT_SET} = require('../../../contants/contants');
const Schema = mongoose.Schema;
const SchemaSource = require('./source.scheme');
// const SchemaCurrency = require('./currency.scheme');
// const SchemaGenre = require('./genre.scheme');
// const SchemaTag = require('./tag.scheme');

const SchemeIncome = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    // date: SchemaDateUTC, // @TODO
    source: {
        type: String,
        required: true,
    },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    currency: {
        type: String,
        default: NOT_SET,
    },
    genre: {
        type: String,
        default: NOT_SET,
    },
    tags: {
        type: [String],
        default: Array,
    },
}, {timestamps: true,});

SchemeIncome.plugin(mongoosePaginate);

module.exports = SchemeIncome;