var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    login: {
        type: String,
        //unique: true,
        require: true
    },
    generalInformation:{
        type:String,
        default:''
    },
    publishing:{
        type:String,
        default:''
    },
    diplomasAndCertificates:{
        type:String,
        default:''
    },
    educationalActivities:{
        type:String,
        default:''
    },
    myHobbies:{
        type:String,
        default:''
    },
    mySites:{
        type:String,
        default:''
    },
    interview:{
        type:String,
        default:''
    },
    contactInformation:{
        type:String,
        default:''
    },
    photographs:{
        type:String,
        default:''
    }
});

exports.Biography = mongoose.model('Biography', schema);