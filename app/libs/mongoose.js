var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
var db = mongoose.connection;

db.on('error', function (err) {
   // log.error('connection error:', err.message);
});
db.once('open', function callback () {
    //log.info("Connected to DB!");
});
module.exports = mongoose;