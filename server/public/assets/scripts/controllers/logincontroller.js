// PRE-LOGIN CONTROLLER

// console.log('HELLO, logincontroller!');
var homeApp = angular.module('myApp', []);

homeApp.controller('HomeSearchController', ['$scope', 'SearchService', function($scope, SearchService) {

  var searchService = SearchService;
  $scope.search = '';

  console.log('@CONTROLLER, $scope.search: ', $scope.search);
  $scope.getSearch = function (search) {
    dataService.getSearch(search);
  };

  $scope.searchResults = dataService.searchResults;


}]);
