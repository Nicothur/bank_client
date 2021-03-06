var projectApp = angular.module('projectApp', ['ngRoute']);

let variable1 = true

projectApp.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.variable1 = $window.variable1;
  }]);

projectApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'index.html',
            controller : 'IndexController'
        })
        .when('/connect', {
            templateUrl : 'connect.html',
            controller : 'ConnectController'
        })
        .when('/register', {
            templateUrl : 'register.html',
            controller : 'RegisterController'
        })
        .when('/profile', {
            templateUrl : 'user/profile.html',
            controller : 'ProfileController'
        })
        .when('/history', {
            templateUrl : 'user/history.html',
            controller : 'HistoryController'
        })
        .when('/send', {
            templateUrl : 'user/send.html',
            controller : 'SendController'
        })
        .otherwise({
            redirectTo: '/'
        });
});