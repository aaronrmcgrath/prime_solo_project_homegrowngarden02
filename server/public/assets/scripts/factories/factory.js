// FACTORY

myApp.factory('DataService', ['$http', '$window', function($http, $window) {
  // var newUser = {};
  var userData = {};
  var userID = 0;
  var gardens = {};
  var formInfo = {};
  var newPlant = {};
  var plantID = 0;
  var gardenID = 0;
  var userSearch = '';
  var searchResults = {};

  var getUser = function(req) {
    $http.get('/user').then(function(res) {



      // console.log('*** || U S E R || ', res.data);
      // if(res.data) {
      userData.res = res.data;
      userID = userData.res.id;
      getGarden(userID);
      getFormDetails();
      // user.id = res.data.id;

      // *** userData Console.log here v
      // console.log('User: ', userData);
      // } else {
      // $window.location.href = 'assets/views/index.html';
      //$location.path = '/';
      // }
    });
  }

  // var getGardenID = function(userID) {
  //   $http.get('/data/' + userID + '/gardenID').then()
  // }

  // GET call to get user's plants in the specific garden
  var getGarden = function(userID) {
    $http.get('/data/' + userID).then(function(res) {
      // console.log('Here is the GARDEN: ', res.data);

      gardens.res = res.data;
      // var plantArray = garden.res;
      // console.log('** ## ! -- User garden!!: ', gardens.res);
      // console.log('^^^ H E R E  I S  userData: ==> ', userData);



      if(gardens.res) {
        var plantArray = gardens.res;
        gardenID = 0;

        for(var i = 0; i < plantArray.length; i++) {
          if(gardenID != plantArray[i].garden_id) {
            gardenID = plantArray[i].garden_id;

          }
            // console.log('$^^^ U S E R  D A T A  @ FACTORY: ', userData);
            // $http.post('/newgarden', userData).then(function(res) {
            //   console.log('ooo * ! * @FACTORY newgarden post response: ', res.data);
            //   console.log('_____||| gardenID: ', gardenID);
        }
        // console.log('!# @ FACTORY, here is gardenID: * === >', gardenID);
        gardens.res.garden_id = gardenID;
        // console.log('$ FACTORY, here is the garden.res: ', gardens.res);

      } else {
        console.log('FAILED MAKING GARDENID!!!');
      }
    });
  };


  // GET call to get the variety options dynamically from the DB
  var getFormDetails = function(req) {
    $http.get('/form').then(function(res){
      formInfo.res = res.data;
      // console.log('!!! @ FACTORY - GET for form: ', formInfo);
    });
  }

  // Posts new plant from the Create Plant form to the plant table in the DB
  var postPlant = function(createPlant) {
    createPlant.garden_id = gardens.res.garden_id;
    // createPlant.date_planted = createPlant.date_planted;
    // console.log('@FACTORY- createPlant: ', createPlant);

    $http.post('/data', createPlant).then(function(res) {
      newPlant.res = createPlant;

      newPlant.res.plant_id = res.data;
      plantID = newPlant.res.plant_id;

      // console.log('$*# ! @ FACTORY, plantID: ', plantID);
      // console.log('!FACTORY***: ', newPlant);
      for(var i = 0; i < plantID.length; i++) {
        // console.log(plantID[i]);
        plantID = plantID[i].id;
      };
      // console.log('+++ ==> @FACTORY plantID after for(): ', plantID);
      newPlant.res.plant_id = plantID
      // console.log('! H E R E   I S   newPlant after everything:  ', newPlant);

      postToGarden(newPlant);
      // console.log('BeFoRe -- #*# #*# NEWPLANT: ', newPlant);
      newPlant = {};
      searchResults = {};
      searchResults.results = [];
      // console.log('AfTeR -- #*# #*# NEWPLANT: ', newPlant);

    });
  };


  // Takes user's request to "add" a plant from the search and stores the
  // info in newPlant to be Posted to the garden_plants in the DB
  var addSearchPlant = function (plant) {
    // console.log('^^^^^ PLANT: ', plant);
    var res = {
      garden_id: gardenID,
      plant_id: plant.plantID,
      date_planted: plant.datePlanted
    }
    newPlant = {
      res: res
    };

    // console.log('^^^%### newPlant @FACTORY in addSearchPlant: ', newPlant, 'Then postToGarden() will run HERE!!!');
    postToGarden(newPlant);
    newPlant = {};
    // console.log('#@FACTORY in addSearchPlant # newPlant after ==> : ', newPlant);
  }


  // POSTS plants to a user's garden
  var postToGarden = function (newPlant) {
    $http.post('/gardenplants', newPlant).then(function(res) {
      // console.log('*!! @ FACTORY, response from adding new plant to garden: ', res.data);
      // console.log('POST ### gardenID in postToGarden() @ FACTORY: ', gardenID);
      getGarden(userID);
    });
  };


  // GET call that searches the DB based on what user inputs in search
  var getSearch = function(userSearch) {
    // console.log('%% ## $$ @FACTORY, userSearch: ', userSearch);
    if(userSearch.length > 0){
      $http.get('/search/' + userSearch).then(function(res) {
        // console.log('*** SEARCH RESULTS: ', res);
        searchResults.results = res.data;
        // console.log('!* # # @FACTORY searchResults: ', searchResults);
      });
    } else {
      searchResults = {};
    };
  };

  // Updates plant in User's garden and sends a PUT call to the DB in table garden_plants
  var addNotes = function(notes) {
    // console.log('HEY, HEY, HEY, @FACTORY - notes: ', notes);
    $http.put('/gardenplants', notes).then(function(res) {
      // console.log(' NN OO TT EE SS == @FACTORY AFTER response from $http.post: ', res.data);
      getGarden(userID);
    });
  };

  // DELETE call to DB to remove plant from User's Garden and the garden_plants table
  var deleteGardenPlant = function(plantID) {
    // console.log('*** ! D E L E T E ! @FACTORY - plantID: ', plantID);
    $http.delete('/gardenplants/' + plantID).then(function(res) {
      // console.log('# ! ^^^^^ B A C K  @FACTORY - here is the response from gardenplant DELETE: ', res);
      getGarden(userID);
    });
  }

  // Logs the user out and directs them to the main page
  var logout = function(){
    console.log('HH EE LL LL OO !!!!!!');
    $http.get('/logout').then(function(response) {
      $window.location.href = '/';
    });
  };

  // var postUser = function (data) {
  //   $http.post('/register').then(function (res) {
  //     newUser.data = res.data;
  //     console.log('Here is the newUser obj: ', newUser.data);
  //     return newUser.data;
  //   });
  // };

  // console.log('!!! User Log in Factory: ', userData);

  getUser();

  return {
    getUser: getUser,
    getGarden: getGarden,
    postPlant: postPlant,
    gardens: gardens,
    getFormDetails: getFormDetails,
    formInfo: formInfo,
    newPlant: newPlant,
    getSearch: getSearch,
    searchResults: searchResults,
    postToGarden: postToGarden,
    addSearchPlant: addSearchPlant,
    addNotes: addNotes,
    deleteGardenPlant: deleteGardenPlant,
    user: userData,
    logout: logout

  }


}]);
