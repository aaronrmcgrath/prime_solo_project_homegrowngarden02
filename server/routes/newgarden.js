// CREATE new Garden in DB for User

var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection.js');
var pg = require('pg');
var path = require('path');



// SECOND POST after creating new plant, updates specific garden
router.post('/', function(req, res, next){

  console.log('@SERVER TESTING gardens save to DB - req.body: ', req.body);
  var req = req.body;

  var newGarden = {
    userID: req.res.id,
    userName: req.res.first_name + "'s Garden"
  };
  var results = [];

  console.log('@SERVER data.js save plant to SPECIFIC Garden:', newGarden);

  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO gardens (user_id, name) VALUES ($1, $2) RETURNING id;', [newGarden.userID, newGarden.userName],
    function (err, result) {
      done();

      if(err) {
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        console.log(result.rows);
        res.json(result.rows); // Sending back An object in an array in an object as a key of res in the mother object... work on later

      }
    });
  });


});


module.exports = router;
