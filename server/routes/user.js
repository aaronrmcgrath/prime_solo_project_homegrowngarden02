// USER ROUTE - HANDLES CALLS IF USER IS VERIFIED

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// GET
router.get('/', function(req, res) {
  // Is the user logged in?
  if(req.isAuthenticated()) {
    // console.log('from user.js ***: ', req.user);
    // send back user object from DB
    var user = {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name
    }
    res.send(user);
  } else {
    // failure best handled on server, redirect here
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
    res.send(false);
  }
});


module.exports = router;
