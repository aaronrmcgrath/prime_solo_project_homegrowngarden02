// SEARCH ROUTE -- Guests or Users search params query DB and send results

var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection.js');
var pg = require('pg');


// GET for Garden Data
router.get('/:search', function (req, res) {

  var search = req.params.search;
  search = '%' + search + '%';
  // console.log('*** @SERVER, search:', search);
  var results = [];

  pg.connect(connectionString, function(err, client, done) {

    var query = client.query('SELECT * FROM plants WHERE plant_name iLIKE $1 OR ' +
    'plant_variety iLIKE $1 OR description iLIKE $1;', [search]);

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
});



module.exports = router;
