var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var publication = new Schema({
    id: {
        type: Number
    },
    namePublication: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    }
});
var schema = new Schema({
    login: {
        type: String,
        require: true
    },
    publishing:[publication]
});

exports.Publishing = mongoose.model('Publishing', schema);