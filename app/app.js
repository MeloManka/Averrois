var express = require('express');

var http = require('http');
var path = require('path');
var formidable = require('formidable');

var config = require('./config');
var log = require('./libs/log')(module);
//var multipart = require('connect-multiparty');
var fs = require('fs');
var bodyParser = require('body-parser');
var json2html = require('node-json2html');
//var multer  = require('multer');
/*var Busboy = require('busboy');
var formidable = require('formidable');
var multiparty = require('multiparty');*/

var app = express();

var User = require('./models/user').User;
var Biography = require('./models/biography').Biography;
var Publishing = require('./models/publishing').Publishing;
var Lectures = require('./models/lectures').Lectures;
var Questions = require('./models/questions').Questions;
//app.use(express.bodyParser());
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.multipart());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//app.use(multer());
//app.use(multer({ dest: './uploads/'}));
//var mwMulter1 = multer({ dest: './uploads/' });

app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(app.router);
app.use(express.static('public'));

/*
app.use(multipart({
    uploadDir: '/home/kgolovchik/CourseWork/course/app/uploads'
}));
*/

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.post('/login',function(req,res){

    User.findOne({login:req.body.login},function (err, user) {
            if(err) throw err;

            if (!user || !user.checkPassword(req.body.password)) {
                res.statusCode = 404;
                return res.send("Not found");
            }
            else {
                console.log("OK");
                res.send("OK");
            }

        }
    )

});

app.get('/:profileId/user',function(req,res){
    User.findOne({login:req.params.profileId},{firstname:1,surname:1,image:1,_id:0},function(err,user){
        if(err) console.log("error find");
        res.json(user);
    });

});

app.post('/registration',function(req,res){

        var user = new User({
            login: req.body.login,
            password: req.body.password1,
            firstname: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            age: req.body.age,
            image:''
        });
        var biography = new Biography({
         login: req.body.login,
         generalInformation:'',
         publishing:'',
         diplomasAndCertificates:'',
         educationalActivities:'',
         myHobbies:'',
         mySites:'',
         interview:'',
         contactInformation:'',
         photographs:''
         });
         var publishing = new Publishing({
         login:req.body.login
         });
    var lectures = new Lectures({
        login:req.body.login
    });
    var questions = new Questions({
        login:req.body.login
    });


    user.save(function (err) {
            if (err) res.status(500);
            console.log("created");
        });
        biography.save(function (err) {
         if (err) throw err;
         console.log("created1");
         });
         publishing.save(function(err){
         if(err)console.log("E");
         console.log("created2");
         });
    lectures.save(function(err){
        if(err)console.log("E");
        console.log("created3");
    });
    questions.save(function(err){
        if(err)console.log("E");
        console.log("created4");
    });
});

app.post('/:profileId/update');

app.get('/:profileId/biography',function(req,res){
    Biography.findOne({login:req.params.profileId},{login:0,_id:0},function(err,user){
        if(err) console.log("error find");
        res.json(user);
    });
});


app.post('/:userId/biography/update',function(req,res){

    console.log(req.body);
    Biography.update({login:req.params.userId},
        {
            generalInformation:req.body.generalInformation,
            publishing:req.body.publishing,
            diplomasAndCertificates:req.body.diplomasAndCertificates,
            educationalActivities:req.body.educationalActivities,
            myHobbies:req.body.myHobbies,
            mySites:req.body.mySites,
            interview:req.body.interview,
            contactInformation:req.body.contactInformation,
            photographs:req.body.photographs
        },function(err,user){
        if(err) console.log("EEE");
        console.log("GOOOD!");
    });

});

app.get('/:profileId/publishing',function(req,res){
    Publishing.findOne({login:req.params.profileId},
    function(err,pub){
        if(err) throw err;
        res.send(pub.publishing);

    });
    /*fs.readFile('api/'+req.params.profileId+'/publishing.json',function(err,data){
        if (err) throw err;
         res.send(data);
    });*/
});



app.post('/:profileId/publishing/addpublication',function(req,res) {
    /*if (!fs.exists('./api/'+ req.params.profileId + '/')){
     fs.mkdir('./api/'+ req.params.profileId + '/');
     fs.mkdir('./api/' + req.params.profileId + '/publishing/');
     }*/
    var form = new formidable.IncomingForm({
        uploadDir: './public/api/' + req.params.profileId + '/publishing/',
        keepExtensions: true
    });

    form.parse(req, function (err, fields, files) {

        Publishing.findOne({login: req.params.profileId}, function (err, pub) {

            var file = files.file;
            console.log(files);
            var tempPath = file.path;
            var l = pub.publishing.length + 1;

            var targetPath = path.resolve('./public/api/' + req.params.profileId + '/publishing/publication' + l + '.pdf');
            fs.rename(tempPath, targetPath, function (err) {
                if (err) {
                    throw err
                }
                console.log(file.name + " upload complete for user: ");
            });

            publication = {
                id: pub.publishing.length + 1,
                namePublication: fields.namePublication,
                description: fields.description,
                link: 'api/' + req.params.profileId + '/publishing/' + 'publication' + l + '.pdf'
            };
            pub.publishing.push(publication);
            pub.save();
        });
    });
    return res.send("OK");
});

app.delete('/:profileId/publishing/:publicationId/delete',function(req,res){
    Publishing.findOne({login:req.params.profileId},function(err,pub){
        console.log(pub.publishing[0].id);
        console.log(req.params.publicationId);
        for(var i = 0;i < pub.publishing.length; ++i){
            if(pub.publishing[i].id == req.params.publicationId){
                pub.publishing[i].remove(function(err){
                        if(!err){
                            console.log("delete!");
                            return res.send("OKK");
                        }
                    }
               );
                fs.unlink('./public/api/'+ req.params.profileId+'/publishing/publication'+ req.params.publicationId+'.pdf');
                return pub.save()
            }
        }
    })
});

app.post('/:profileId/publishing/:publicationId/update');

app.post('/:profileId/up',function(req,res){

    var form = new formidable.IncomingForm({
        uploadDir: './public/api/' + req.params.profileId + '/',
        keepExtensions: true
    });

    form.parse(req, function (err, fields, files) {



            var file = files.file;
            console.log(files);
            var tempPath = file.path;


           var targetPath = path.resolve('./public/api/' + req.params.profileId + '/image.jpg' );
            fs.rename(tempPath, targetPath, function (err) {
                if (err) {
                    throw err
                }
                console.log(file.name + " upload complete for user: ");
            });
        User.update({ login:req.params.profileId }, {$set:{image: 'api/' + req.params.profileId + '/image.jpg'}}, {upsert: true}, function(err){})
});
    return res.send("OK");
});

/////////////////LECTURES//////////////////////////

app.get('/:profileId/lectures',function(req,res){
    Lectures.findOne({login:req.params.profileId},
        function(err,lec){
            if(err) throw err;
            res.send(lec.lectures);

        });
    /*fs.readFile('api/'+req.params.profileId+'/publishing.json',function(err,data){
     if (err) throw err;
     res.send(data);
     });*/
});



app.post('/:profileId/lectures/addlecture',function(req,res) {
    /*if (!fs.exists('./api/'+ req.params.profileId + '/')){
     fs.mkdir('./api/'+ req.params.profileId + '/');
     fs.mkdir('./api/' + req.params.profileId + '/publishing/');
     }*/
    var form = new formidable.IncomingForm({
        uploadDir: './public/api/' + req.params.profileId + '/lectures/',
        keepExtensions: true
    });

    form.parse(req, function (err, fields, files) {

        Lectures.findOne({login: req.params.profileId}, function (err, lec) {

            var file = files.file;
            console.log(files);
            var tempPath = file.path;
            var l = lec.lectures.length + 1;

            var targetPath = path.resolve('./public/api/' + req.params.profileId + '/lectures/lecture' + l + '.pdf');
            fs.rename(tempPath, targetPath, function (err) {
                if (err) {
                    throw err
                }
                console.log(file.name + " upload complete for user: ");
            });

            lecture = {
                id: lec.lectures.length + 1,
                nameLecture: fields.nameLecture,
                description: fields.description,
                link: 'api/' + req.params.profileId + '/lectures/' + 'lecture' + l + '.pdf'
            };
            lec.lectures.push(lecture);
            lec.save();
        });
    });
    return res.status(200);
});

app.delete('/:profileId/lectures/:lectureId/delete',function(req,res){
    Lectures.findOne({login:req.params.profileId},function(err,lec){
        console.log(lec.lectures[0].id);
        console.log(req.params.lectureId);
        for(var i = 0;i < lec.lectures.length; ++i){
            if(lec.lectures[i].id == req.params.lectureId){
                lec.lectures[i].remove(function(err){
                        if(!err){
                            console.log("delete!");
                            return res.send("OKK");
                        }
                    }
                );
                fs.unlink('./public/api/'+ req.params.profileId+'/lectures/lecture'+ req.params.lectureId+'.pdf');
                return lec.save()
            }
        }
    })
});

app.post('/:profileId/lectures/:lectureId/update');

/////////////////QUESTIONS//////////////////////////

app.get('/:profileId/questions',function(req,res){
    Questions.findOne({login:req.params.profileId},{questions:1,_id:0},
        function(err,ques){
            console.log(ques);
            if(err) throw err;
            questionsObject = new Object({questionsArray:[]});
            for(var i = 0; i < ques.questions.length; ++i){
                if(ques.questions[i].answer == ''){
                    questionsObject.questionsArray.push(ques.questions[i]);
                }
            }
            var q = JSON.stringify(questionsObject.questionsArray);
            res.send(q);
        });
});

app.post('/:profileId/questions/addquestion',function(req,res) {

    Questions.findOne({login: req.params.profileId}, function (err, ques) {

            var l = ques.questions.length + 1;

            question = {
                id: l,
                question: req.body.text,
                answer: ''
            };
            ques.questions.push(question);
            ques.save();
        });
    return res.status(200);
});

app.delete('/:profileId/questions/:questionId/delete',function(req,res){
    Questions.findOne({login:req.params.profileId},function(err,ques){
        console.log(ques.questions[0].id);
        console.log(req.params.questionId);
        for(var i = 0;i < ques.questions.length; ++i){
            if(ques.questions[i].id == req.params.questionId){
                ques.questions[i].remove(function(err){
                        if(!err){
                            console.log("delete!");
                            return res.send("OKK");
                        }
                    }
                );

                return ques.save()
            }
        }
    })
});

app.post('/:profileId/questions/:questionId/answer',function(req,res){
    Questions.findOne({login:req.params.profileId},function(err,ques){
        console.log(ques.questions[0].id);
        console.log(req.params.questionId);
        for(var i = 0;i < ques.questions.length; ++i){
            if(ques.questions[i].id == req.params.questionId){
                ques.question[i].update({answer:req.answer});
                ques.questions[i].remove(function(err){
                        if(!err){
                            console.log("delete!");
                            return res.send("OKK");
                        }
                    }
                );

                return ques.save()
            }
        }
    });
});

http.createServer(app).listen(config.get('port'), function(){
 log.info('Express server listening on port ' + config.get('port'));
 });