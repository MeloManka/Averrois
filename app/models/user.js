var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    login: {
        type: String,
        //unique: true,
        require: true
    },
    hashedPassword:{
        type:String,
        required: true
    },
    salt:{
        type:String,
        required: true
    },
    firstname:{
        type:String
    },
    surname:{
        type:String
    },
    patronymic:{
        type:String
    },
    age:{
        type:Number
    },
    image:{
        type:String
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
.set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
.get(function(){
        return this._plainPassword;
    });
schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);
