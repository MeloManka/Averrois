/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
    name : String
});
schema.methods.meow = function(){
    console.log(this.get("name"))
}

var Cat = mongoose.model('Cat', schema);

var kitty = new Cat({
    name: 'Zilh'
});
Cat.find(function (err, users) {
console.log(users)
});*/
//kitty.save(function(err,kitty,affected){
   //kitty.meow();
//});

var User = require('models/user').User;
User.remove({},function (err) {
    if (err) return handleError(err);

});
User.find(function (err, users) {
    console.log(users)
});
/*var user1 = new User({
    login: "DDD",
    password: "DDD",
    firstname:"DDD",
    surname: "DDD",
    patronymic: "DDD",
    age:33
});
//User.find().remove().exec();
user1.save(function(err,users,affected){
    if(err)throw err;
    User.find(function (err, users) {
        console.log(users)
    });

});*/
