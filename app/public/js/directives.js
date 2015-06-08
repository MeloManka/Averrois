var projectDirective = angular.module('projectDirective',[]);

projectDirective.directive('svgMenu',['$compile',function($compile){
    return{
        restrict:'A',
        templateUrl: 'img/menu.svg',
        link: function(scope,element,attrs){
            var buttons = element[0].querySelectorAll('.button');
            angular.forEach(buttons, function (path, key) {
                var pageElement = angular.element(path);
                pageElement.attr("page", "");
                $compile(pageElement)(scope);
            })
        }
    }
}]);

projectDirective.directive('page',['$compile','$location','$rootScope','$routeParams',function($compile,$location,$rootScope,$routeParams){
    return{
        restrict: 'A',
        scope: {
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.buttonClick = function () {
                if(scope.elementId === 'publishing'){
                    $location.path('/profile/'+$routeParams.profileId+'/publishing');
                }
                if(scope.elementId === 'lectures'){
                    $location.path('/profile/'+$routeParams.profileId+'/lectures');
                }
                if(scope.elementId === 'search'){
                    $location.path('/profile/'+$routeParams.profileId+'/search');
                }
                if(scope.elementId === 'settings'){
                    $location.path('/profile/'+$routeParams.profileId+'/settings');
                }
                if(scope.elementId === 'calendar'){
                    $location.path('/profile/'+$routeParams.profileId+'/calendar');
                }
                if(scope.elementId === 'questions'){
                    $location.path('/profile/'+$routeParams.profileId+'/questions');
                }
                if(scope.elementId === 'biography'){
                    $location.path('/profile/'+$routeParams.profileId+'/biography');
                }
            };
            element.attr("ng-click", "buttonClick()");
            element.removeAttr("page");
            $compile(element)(scope);
        }
    }
}]);

projectDirective.directive('draggableStrip',['$document',function($document){
    return function(scope,element,attr){
        var startX = 0, startY = 0, x = 0, y = 0;
        var  next = document.getElementById("dragMenu");

        element.css({
            position: 'absolute',
            cursor: 'pointer'

        });

        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;

            element.css({
                top: y + 'px',
                left:  x + 'px'
            });
            next.style.marginTop = y  + "px";
            next.style.marginLeft = x + "px";

        }

        function mouseup() {

            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }

    };
}]);

projectDirective.directive('popUpContent',function(){
    return {
        restrict: 'E',
        scope: false,

        controller: controllerBiography




    }
});

projectDirective.directive('buttonProfile',function(){
   return{
       restrict:'E',
       scope:false,
       template:'<a class="buttonProfile" href ng-click="buttonProfile(1)"></a>',
       controller: function($scope,$location,$routeParams){
           $scope.buttonProfile = function(check){
               if(check === 1){
                   $location.path('/profile/'+$routeParams.profileId);
               }

           }
       }
   }
});

projectDirective.directive('imageProfile', function(){
    return function ($scope, element, attr) {

        attr.$observe('imageProfile', function(value) {
            if (value) {
                element.css({
                    'background-image': 'url(' + value + ')'

                });
            }
        });
        }


});

