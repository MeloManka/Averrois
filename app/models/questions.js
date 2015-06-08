var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var question = new Schema({
    id: {
        type: Number
    },
    question: {
        type: String
    },
    answer: {
        type: String
    }
});

var schema = new Schema({
    login: {
        type: String,
        require: true
    },
    questions:[question]
});

exports.Questions = mongoose.model('Questions', schema);