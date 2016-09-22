// FORM ROUTE -- brings in form information

var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection.js');
var pg = require('pg');


router.get('/', function(req, res) {

  var formResults = [];

  pg.connect(connectionString, function(err, client, done) {

    var query = client.query('SELECT * FROM plant_type;');

    query.on('row', function(row) {
      formResults.push(row);
      // console.log('Server Garden GET! :', formResults);
    });

    query.on('err', function(err) {
      console.log(err);
    });

    query.on('end', function() {
      done();
      return res.json(formResults);
    });

    if(err) {
      console.log(err);

    }
  });
});


module.exports = router;
