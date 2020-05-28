const mongoose = require('mongoose');
const SchemeTag = require('../../schemes/entities/tag.scheme');
const Tag = mongoose.model('Tag', SchemeTag);

module.exports = Tag;