// PRE-LOGIN FACTORY

homeApp.factory('SearchService', '$window' ['$http', '$window', function($http) {


  var homeSearch = '';
  var searchResults = {};

  // Search Function that submits calls to DB and sends resutls
  var getSearch = function(homeSearch) {
    console.log('%% ## $$ @FACTORY, userSearch: ', homeSearch);
    if(homeSearch.length > 0){
      $http.get('/search/' + homeSearch).then(function(res) {
        console.log('*** SEARCH RESULTS: ', res);
        searchResults.results = res.data;
        console.log('!* # # @FACTORY searchResults: ', searchResults);
      });
    };
  };

  // Logs the user out and directs them to the main page
  // var logout = function(){
  //   $http.get('/logout').then(function(response) {
  //     $window.location.href = '/';
  //   });
  // };

  return {
    getSearch: getSearch,
    searchResults: searchResults
  }


}]);
