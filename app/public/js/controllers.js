var projectController = angular.module('projectController',[]);

projectController.controller('controllerFirst',function($scope,$location){
    $scope.transition = function(numbe){
        if(numbe === 1){
            $location.path('/login');
        }
        if(numbe === 2) {
            $location.path('/registration');
        }
        if(numbe === 3) {
            $location.path('/aboutAverrois');
        }
    };

    $scope.snippetWithTarget = 'http://angularjs.org/';
});

projectController.controller('controllerLogin',function($location,$scope,$rootScope,$routeParams,$http){
    $scope.back = function(){
        $location.path('/')
    };
    $scope.enter = function(users){

        $scope.user = angular.copy(users);

        $http({method:"POST",url:"/login",data:$scope.user})
            .success(function(data){

                    $rootScope.login = $scope.user.login;

                    $routeParams.profileId = $rootScope.login;

                    $location.path('/profile/' + $scope.user.login);

            }).error(function(data){

                alert(data);
            })
    }
});


projectController.controller('controllerRegistration',function($location,$scope,$http){
    $scope.enter = function(users){

        $scope.user = angular.copy(users);

        $http({method:"POST",url:"/registration",data:$scope.user}).success(function(data,status){
            if(status){
                alert("SOS");
            }
        });
        $location.path('/login');
    };
    $scope.back = function(){
        $location.path('/')
    };
});

projectController.controller('controllerProfile',function($scope,Upload,$rootScope,$http,$routeParams){
    $scope.person={};
    $http.get('/'+$routeParams.profileId+'/user').success(function(data){
        $scope.person = data;
        $scope.a = "1";
    });

    $scope.upl = function(files){

        if(files && files.length){
            for(var i = 0;i < files.length;++i){

                var file = files[i];
    file.upload=Upload.upload({

        url: '/'+ $routeParams.profileId+'/up',
        method: 'POST',
        fields:"FFF",
        file: file
    });

    file.upload.then(function (response) {
        file.result = response.data;

    }, function (response) {
        if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        window.location.reload(false);
    });

    file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

    });
    }}
        window.location.reload(false);
    };


});

projectController.controller('controllerBiography',function($scope,$http,$location,$routeParams){
    $scope.button1 = "Редактировать";
    $scope.titlePage = "Б и о г р а ф и я";
    $scope.tab = 1;
    $scope.tab1 = 1;

    $scope.selectTab = function(setTab){

        $scope.tab = setTab;

    };

    $scope.isSelected = function(checkTab){

        return $scope.tab === checkTab;

    };


    $scope.selectTab1 = function(setTab){
        $scope.tab1 = setTab;

    };

    $scope.isSelected1 = function(checkTab){
        return $scope.tab1 === checkTab;
    };

    $http.get('/'+$routeParams.profileId+'/biography').success(function(data){
        $scope.person = data;
    });

    $scope.openPopUp = function(){
        $scope.showPopUpContent1 = true;
        document.body.style.overflow = "hidden";
    };
    $scope.closePopUp = function(){
        $scope.showPopUpContent = false;
        $scope.showPopUpContent1 = false;
        persons = null;
        window.location.reload(false);
    };

    $scope.saveChangeBiography = function(biography){
        $scope.bio = angular.copy(biography);
        $http({method:"POST", url:'/'+ $routeParams.profileId +'/biography/update',data:$scope.bio});
        $scope.closePopUp();
    }

});

projectController.controller('controllerLectures',function($scope,Upload,$http,$routeParams,$location,$document){
    $scope.titlePage = "Лекции";

    $scope.button1 = "Добавить публикацию";

    $http.get('/'+$routeParams.profileId+'/lectures').success(function(data){
        $scope.lectures = data;
    });


    $scope.openPopUp = function(num,lecture){
        if(num == 1){
            $scope.showPopUpContent = true;
        }
        if(num == 2){
            $scope.showPopUpContent1 = true;
        }

        document.body.style.overflow = "hidden";
        $scope.lecture = lecture;
    };

    $scope.closePopUp = function(num){
        if(num==1){
            $scope.showPopUpContent = false;
        }
        if(num==2){
            $scope.showPopUpContent1 = false;
        }

    };
    $scope.delPub = function(id){

        $http.delete('/' + $routeParams.profileId + '/lectures/' + id + '/delete');
        window.location.reload(false);
    };
    $scope.addPublication = function(lecture,files){
        $scope.lec = angular.copy(lecture);
        if(files && files.length){
            for(var i = 0;i < files.length;++i){

                var file = files[i];
                // $http({method:"POST",url:'/'+$routeParams.profileId+'/publishing/addpublication',data:$scope.pub});
                file.upload=Upload.upload({
                    url: '/'+$routeParams.profileId+'/lectures/addlecture',
                    method: 'POST',
                    //fields:$scope.pub,
                    //headers: {'enctype': 'multipart/form-data'},
                    /*headers: {
                     //'Content-Type': file.type
                     'enctype': 'multipart/form-data'
                     },*/
                    fields:$scope.lec,
                    file: file
                    //data: file
                    /*                    url: '/upload',
                     method: 'POST',
                     headers: {
                     'Content-Type': file.type
                     },
                     data: file*/
                });

                file.upload.then(function (response) {
                    file.result = response.data;

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    window.location.reload(false);
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });

                /*         .progress(function (evt) {
                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                 console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                 }).success(function (data, status, headers, config) {
                 console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                 });*/
            }
        }

    };

    $scope.upload = function (files) {
        alert("FFF");

    };

});

projectController.controller('controllerPublishing',function($scope,Upload,$http,$routeParams,$location,$document){
    $scope.titlePage = "Публикации";
    $scope.button1 = "Добавить публикацию";

   $http.get('/'+$routeParams.profileId+'/publishing').success(function(data){
       $scope.publishing = data;
       for(var i = 0; i < $scope.publishing.length; ++i){
           $scope.publishing[i].num = i + 1;
       }

    });


    $scope.openPopUp = function(num,publication){
        if(num==1){
            $scope.showPopUpContent = true;
        }
        if(num==2){
            $scope.showPopUpContent1 = true;
        }

        //document.body.style.overflow = "hidden";
        $scope.publication = publication;
    };

    $scope.closePopUp = function(num){
        if(num==1){
            $scope.showPopUpContent = false;
        }
        if(num==2){
            $scope.showPopUpContent1 = false;
        }

    };
    $scope.delPub = function(id){

        $http.delete('/' + $routeParams.profileId + '/publishing/' + id + '/delete');
        window.location.reload(false);
    };
    $scope.addPublication = function(publication,files){
        $scope.pub = angular.copy(publication);
        if(files && files.length){
            for(var i = 0;i < files.length;++i){
;
                var file = files[i];
       // $http({method:"POST",url:'/'+$routeParams.profileId+'/publishing/addpublication',data:$scope.pub});
                file.upload=Upload.upload({
                    url: '/'+$routeParams.profileId+'/publishing/addpublication',
                    method: 'POST',
                    fields:$scope.pub,
                    file: file
                });

                file.upload.then(function (response) {
                    file.result = response.data;

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    window.location.reload(false);
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
           }
        }
        window.location.reload(false);
    };

    $scope.upload = function (files) {
        alert("FFF");

    };


});

projectController.controller('controllerSearch',function($scope){
    $scope.titlePage = "Поиск";
});
projectController.controller('controllerSettings',function($scope){
    $scope.titlePage = "Настройки";
});
projectController.controller('controllerCalendar',function($scope){
    $scope.titlePage = "Календарь";
    $scope.day = moment();
});
projectController.controller('controllerQuestions',function($scope,$http,$routeParams,$location,$document){
    $scope.titlePage = "Вопросы";

    $scope.tab = 1;
    $scope.tab1 = 1;
    $http.get('/'+$routeParams.profileId+'/questions').success(function(data){
        $scope.questions = data;
    });
    $scope.selectTab = function(setTab){
        $scope.tab = setTab;

    };

    $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
    };


    $scope.selectTab1 = function(setTab){
        $scope.tab1 = setTab;

    };

    $scope.isSelected1 = function(checkTab){
        return $scope.tab1 === checkTab;
    };
    $scope.openPopUp = function(num,question){
        if(num==1){
            $scope.showPopUpContent = true;
        }
        if(num==2){
            $scope.showPopUpContent1 = true;
        }

        document.body.style.overflow = "hidden";
        $scope.question = question;
    };

    $scope.closePopUp = function(num){
        if(num==1){
            $scope.showPopUpContent = false;
        }
        if(num==2){
            $scope.showPopUpContent1 = false;
        }

    };
    $scope.ask = function(question){

        $scope.q = angular.copy(question);
        $http({method:"POST",url:'/' + $routeParams.profileId + '/questions/addquestion',data:$scope.q});

        window.location.reload(false);
    };

    $scope.jsonEscape = function(str) {
        return html(str.replace(/\n/g, "<br>"));
    };
});

projectController.filter('linebreak', function() {
    return function(text) {
        return text.replace(/\n/g, '<br>');
    }
});
projectController.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

