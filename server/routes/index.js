// MAIN ROUTER

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Post - handles user log in, Is successful or is not...
router.post('/', passport.authenticate('local', {
  successRedirect: '/assets/views/routes/user.html',
  failureRedirect: '/assets/views/routes/failure.html'
}));

//User Get
router.get('/users', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/assets/views/users.html'));
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
    console.log('@ SERVER - Logged Out!');
});

// General/wildcard Get
router.get('/*', function(req, res, next) {
  var file = req.params[0] || '/assets/views/index.html';
  res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;
