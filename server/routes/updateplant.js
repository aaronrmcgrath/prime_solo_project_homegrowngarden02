// GARDEN PLANT ROUTE -- CRUD for DB - STORES NEW PLANTS TO USER'S GARDEN

var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection.js');
var pg = require('pg');



// PUT for updating after creating new plant, updates specific garden
router.put('/', function(req, res, next){

  // console.log('@@@ SERVER TESTING notes update - save to DB - req.body: ', req.body);
  var req = req.body;

  var updatePlant = {
    id: req.plant_id,
    notes: req.notes
  };
  var results = [];

  console.log('@SERVER data.js save plant to SPECIFIC Garden:', updatePlant);

  pg.connect(connectionString, function(err, client, done){
    client.query('UPDATE garden_plants SET notes = $1 WHERE id = ($2) RETURNING id;', [updatePlant.notes, updatePlant.id],
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
