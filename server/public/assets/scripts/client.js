// CLIENT APP

// console.log('Client.js working!!!');
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);



myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
      when('/garden', {
        templateUrl: '/assets/views/routes/garden.html',
        controller: 'UserController'
      }).
      when('/addplant', {
        templateUrl: '/assets/views/routes/addplant.html',
        controller: 'AddPlantController'
      }).
      // when('/user', {
      //   templateUrl: '/routes/user.html',
      //   controller: 'UserController'
      // }).
      // when('/home', {
      //   templateUrl: '/assets/views/routes/home.html',
      //   controller: 'UserController'
      // }).
      // when('/assets/views/index.html', {
      //   templateUrl: '/assets/views/index.html',
      //   controller: 'HomeSearchController'
      // }).
      otherwise({
        redirectTo: '/garden'
      });
}]);
