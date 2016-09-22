// REGISTER USERS

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// module with bcrypt functions and DB connections
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');


// Handles request for HTML file
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/assets/views/register.html'));
});

// Hnadles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password)
  };
  var userID = 0;
  var results = [];
  var userGardenName = req.body.firstname;

  // console.log('New User: ', saveUser);

  pg.connect(connection, function(err, client, done) {
    var query = client.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id;',
    [saveUser.firstname, saveUser.lastname, saveUser.username, saveUser.password]);
    // function(err, result) {
      // client.end();
      // console.log('<><> @ SERVER, results: ', result);

      query.on('row', function(row) {
        results.push(row);

        // console.log('ooo @Server New User returning ID in row (after results.push(row))! :', results);

        for(var i = 0; i < results.length; i++) {
          userID = results[i].id;
          console.log('~~~ @@SERVER in for loop - userID: ', userID);
        }

        query = client.query('INSERT INTO gardens (user_id, name) VALUES ($1, $2) RETURNING id;', [userID, userGardenName]);

        query.on('row', function(row) {
          results.push(row);
        });

        query.on('err', function(err) {
          console.log(err);
        });

        query.on('end', function() {
          done();
        });


          if(err) {
            console.log('Error inserting data: ', err);
          } else {
            res.redirect('/');
          }
        });
      });

  });


module.exports = router;
