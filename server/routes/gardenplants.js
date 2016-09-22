// GARDEN PLANT ROUTE -- CRUD for DB - STORES NEW PLANTS TO USER'S GARDEN

var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection.js');
var pg = require('pg');
var path = require('path');



// SECOND POST after creating new plant, updates specific garden
router.post('/', function(req, res, next){

  // console.log('TESTING garden_plants save to DB - req.body: ', req.body);
  var req = req.body;

  var gardenPlant = {
    garden: req.res.garden_id,
    plant: req.res.plant_id,
    date_planted: req.res.date_planted
  };
  var results = [];

  console.log('@SERVER gardenplants.js save plant to SPECIFIC Garden:', gardenPlant);

  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO garden_plants (garden, plant, date_planted) VALUES ($1, $2, $3) RETURNING id;', [gardenPlant.garden, gardenPlant.plant, gardenPlant.date_planted],
    function (err, result) {
      done();

      if(err) {
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        console.log(result.rows);
        res.json(result.rows); // Sending back An object in an array in an object as a key of res in the mother object... work on later
        // res.sendFile(path.resolve(__dirname, '../public/assets/views/users.html#/garden'));

      }
    });
  });


});


// PUT for updating after creating new plant, updates specific garden plant notes and date harvested, etc...
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


// DELETE gardenplant from User's garden and garden_plants table in DB
// SECOND POST after creating new plant, updates specific garden
router.delete('/:id', function(req, res, next){

  // console.log('!# @ SERVER -- TESTING garden_plants D E L E T E from DB - req.params.id: ', req.params.id);
  var req = req.params;

  var deletePlant = {
    id: req.id,
  };
  var results = [];

  console.log('@SERVER gardenplants.js DELETE plant from User Garden:', deletePlant);

  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM garden_plants WHERE id = $1;', [deletePlant.id],
    function (err, result) {
      done();

      if(err) {
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        console.log(result);
        res.json(result); // Sending back An object in an array in an object as a key of res in the mother object... work on later
      }
    });
  });

});


module.exports = router;
