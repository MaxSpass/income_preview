const mongoose = require('mongoose');
const SchemeGenre = require('../../schemes/entities/genre.scheme');
const Genre = mongoose.model('Genre', SchemeGenre);

module.exports = Genre;