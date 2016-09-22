// LOGIN ROUTER

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');



//User Get
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/assets/views/login.html'));
});


module.exports = router;
