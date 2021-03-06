var projectApp = angular.module('projectApp',
	[
		'ngRoute',
		'projectController',
        'projectDirective',
        'oi.file',
        'ngFileUpload'
	]);

projectApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
        when('/first',
        {
		    templateUrl:'first.html',
		    controller:'controllerFirst'
	    }).
        when('/login',
        {
            templateUrl:'login.html',
            controller:'controllerLogin'
        }).
        when('/registration',
        {
            templateUrl:'registration.html',
            controller:'controllerRegistration'
        }).
        when('/aboutAverrois',
        {
            templateUrl:'aboutAverrois.html'
        }).
        when('/profile/:profileId',
        {
            templateUrl:'profile.html',
            controller:'controllerProfile'
        }).
        when('/profile/:profileId/biography',
        {
            templateUrl:'profile/biography.html',
            controller:'controllerBiography'
        }).
        when('/profile/:profileId/publishing',
        {
            templateUrl:'profile/publishing.html',
            controller:'controllerPublishing'
        }).
        when('/profile/:profileId/publishing/:publishingId',
        {
            templateUrl:'profile/publishing.html',
            controller:'controllerPublishing'
        }).
        when('/profile/:profileId/lectures',
        {
            templateUrl:'profile/lectures.html',
            controller:'controllerLectures'
        }).
        when('/profile/:profileId/search',
        {
            templateUrl:'profile/search.html',
            controller:'controllerSearch'
        }).
        when('/profile/:profileId/settings',
        {
            templateUrl:'profile/settings.html',
            controller:'controllerSettings'
        }).
        when('/profile/:profileId/calendar',
        {
            templateUrl:'profile/calendar.html',
            controller:'controllerCalendar'
        }).
        when('/profile/:profileId/questions',
        {
            templateUrl:'profile/questions.html',
            controller:'controllerQuestions'
        }).
        otherwise({
            redirectTo:'/first'
        })
}]);



