// SERVER APP

// NODE MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// AUTHENTICATION
var passport = require('./strategies/local');
var session = require('express-session');

// ROUTES/CUSTOM MODULES
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var login = require('./routes/login');
var data = require('./routes/data');
var form = require('./routes/form');
var gardenPlants = require('./routes/gardenplants');
var search = require('./routes/search');
var newGarden = require('./routes/newgarden');
// var updatePlant = require('./routes/updateplant');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session config
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false}
}));

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/login', login);
app.use('/user', user);
app.use('/data', data);
app.use('/form', form);
app.use('/gardenplants', gardenPlants);
app.use('/search', search);
app.use('/newgarden', newGarden);
// app.use('/updateplant', updatePlant);
app.use('/', index);


// Set Port
app.set('port', (process.env.PORT || 8000));

//Listen
app.listen(app.get('port'), function(){
  console.log('Listening on port: ', app.get('port'));
});


module.exports = app;
