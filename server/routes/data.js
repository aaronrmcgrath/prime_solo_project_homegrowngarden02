// DATA ROUTE -- CRUD for DB

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var connectionString = require('../modules/connection.js');
var pg = require('pg');


// GET for Garden Data
// Verifies whether a user is logged in or not
router.get('/:id', function(req, res) {
  if(req.isAuthenticated()) {
    var userID = req.params.id;
    // console.log('*SERVER userID for getGarden:', userID);
    var results = [];
    // res.send(req.user);

    pg.connect(connectionString, function(err, client, done) {
      // var query = client.query('SELECT name FROM gardens WHERE gardens.user = $1;', [userID]);

      // var query = client.query('SELECT plants.plant_name, gardens.name, garden_plants.id FROM plants JOIN garden_plants ON plants.id = garden_plants.plant JOIN gardens ON garden_plants.garden = gardens.id WHERE gardens.user = $1;', [userID]);

      // LEFT JOIN to grab everything and GROUP BY user.id and garden.id then aggregate the plant data
      var query = client.query('SELECT gardens.id AS garden_id, gardens.name, plants.plant_name, garden_plants.id AS garden_plants_id, plants.plant_variety, plants.description, garden_plants.date_planted, garden_plants.notes FROM gardens LEFT JOIN garden_plants ON gardens.id = garden_plants.garden LEFT JOIN plants ON garden_plants.plant = plants.id WHERE gardens.user_id = $1 ORDER BY garden_plants_id;', [userID]);
      // need to try and add a GROUP BY gardens.id at some point -- this did work for getting info back: * GROUP BY gardens.id, gardens.name, plants.plant_name, garden_plants.id *

      query.on('row', function(row) {
        results.push(row);
        console.log('Server Garden GET! :', results);
      });

      query.on('err', function(err) {
        console.log(err);
      });

      query.on('end', function() {
        done();
        return res.json(results);
      });

      if(err) {
        console.log(err);

      }
    });

  } else {
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
    // res.send(false);
  }
});

// router.get('/:id', function (req, res) {
//
//   var userID = req.params.id;
//   console.log('*SERVER userID for getGarden:', userID);
//   var results = [];
//
//   // TODO NEED TO STOP SERVER FROM CRASHING WHEN USER ISN'T LOGGED IN
//
//   if(userID == undefined) {
//     // router.get('/', function(req, res) {
//     //   console.log('User not logged in');
//     //   return res.send('User not logged in', response);
//     // });
//
//
//   };
//
//   pg.connect(connectionString, function(err, client, done) {
//     // var query = client.query('SELECT name FROM gardens WHERE gardens.user = $1;', [userID]);
//
//     // var query = client.query('SELECT plants.plant_name, gardens.name, garden_plants.id FROM plants JOIN garden_plants ON plants.id = garden_plants.plant JOIN gardens ON garden_plants.garden = gardens.id WHERE gardens.user = $1;', [userID]);
//
//     // LEFT JOIN to grab everything and GROUP BY user.id and garden.id then aggregate the plant data
//     var query = client.query('SELECT gardens.id AS garden_id, gardens.name, plants.plant_name, garden_plants.id AS garden_plants_id, plants.plant_variety, plants.description, garden_plants.date_planted, garden_plants.notes FROM gardens LEFT JOIN garden_plants ON gardens.id = garden_plants.garden LEFT JOIN plants ON garden_plants.plant = plants.id WHERE gardens.user_id = $1 ORDER BY garden_plants_id;', [userID]);
//     // need to try and add a GROUP BY gardens.id at some point -- this did work for getting info back: * GROUP BY gardens.id, gardens.name, plants.plant_name, garden_plants.id *
//
//     query.on('row', function(row) {
//       results.push(row);
//       console.log('Server Garden GET! :', results);
//     });
//
//     query.on('err', function(err) {
//       console.log(err);
//     });
//
//     query.on('end', function() {
//       done();
//       return res.json(results);
//     });
//
//     if(err) {
//       console.log(err);
//
//     }
//   });
//
//   // res.send(res.data);
//   // console.log('Server Garden GET! :', res.data);
// });



// POST for creating new plant in DB for all...
router.post('/', function(req, res, next){

  var savePlant = {
    plant_name: req.body.plant_name,
    plant_type: req.body.type.id,
    plant_variety: req.body.plant_variety,
    description: req.body.description
  };
  var results = [];

  console.log('@SERVER data.js ready to save to DB:', savePlant);

  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO plants (plant_name, plant_type, plant_variety, description) VALUES ($1, $2, $3, $4) RETURNING id;', [savePlant.plant_name, savePlant.plant_type, savePlant.plant_variety, savePlant.description],
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
