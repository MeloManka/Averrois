var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var lecture = new Schema({
    id: {
        type: Number
    },
    nameLecture: {
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
    lectures:[lecture]
});

exports.Lectures = mongoose.model('Lectures', schema);
