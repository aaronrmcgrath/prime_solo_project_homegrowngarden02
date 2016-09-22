// CONNECTION file

// var dotenv = require('dotenv').config();
// var dbConnectionString = process.env.dbConnectionString;
var pg = require('pg');
var connectionString;

if(process.env.HEROKU_POSTGRESQL_CYAN_URL != undefined) {

  // pg.defaults.ssl = true;

  // connectionString = process.env.DATABASE_URL;
  // connectionString = HEROKU_POSTGRESQL_CYAN_URL;
  // connetionString = dbConnectionString;
  connectionString = process.env.HEROKU_POSTGRESQL_CYAN_URL + '?sslmode=require';
  // connectionString = process.env.DATABASE_URL + '?sslmode=require';

  console.log('Here is process.env.DATABASE_URL: ', process.env.DATABASE_URL);
  console.log('Here is connectionString: ', connectionString);
} else {
  // LOCAL DB
  connectionString = 'postgres://localhost:5432/homegrown_1';
  // TEST DB
  // connectionString = 'postgres://localhost:5432/homegrownTest_1';

}

// TODO *** CREATE DB HERE! So when hosted it will create dynamically ***

// CREATE DB AND TABLES IF DB DOES NOT EXIST

pg.connect(connectionString, function(err, client, done){

  // var user = 'CREATE TABLE IF NOT EXISTS "user" (id SERIAL PRIMARY KEY, username varchar(80) NOT NULL, password varchar(100) NOT NULL, first_name varchar(80) NOT NULL, last_name varchar(80));';

  if (err) {
    console.log('Error connecting to DB!', err);
    console.log('Error - connectionString: ', connectionString);
    // TODO end process with error code
  } else {
    console.log('CONNECTING TO DB pg.connect - Made it here, did not get error and about to create tables if not exist!');
    var query = client.query('CREATE TABLE IF NOT EXISTS "users" ' +
    '(id SERIAL PRIMARY KEY,' +
    'username varchar(80) NOT NULL,' +
    'password varchar(100) NOT NULL,' +
    'first_name varchar(80) NOT NULL,' +
    'last_name varchar(80));' +
    'CREATE TABLE IF NOT EXISTS gardens' +
    '(id SERIAL PRIMARY KEY,' +
    'user_id int,' +
    'name varchar(80),' +
    'CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES "users"(id));' +
    'CREATE TABLE IF NOT EXISTS plant_type' +
    '(id SERIAL PRIMARY KEY,' +
    'type varchar(80));' +
                                                        // insert into tablename (code) values ('1448523')
                                                        // WHERE not exists(select * from tablename where code='1448523')
    /*
    'INSERT INTO plant_type (type)' +
    "VALUES ('Fruit')" +
    'WHERE NOT EXISTS;' +
    'INSERT INTO plant_type (type)' +
    "VALUES ('Vegetable');" +
    'INSERT INTO plant_type (type)' +
    "VALUES ('Herb');" +*/
    'CREATE TABLE IF NOT EXISTS watering_level' +
    '(id SERIAL PRIMARY KEY,' +
    'watering_level varchar(80));' +/*
    'INSERT INTO watering_level (watering_level)' +
    "VALUES ('Low');" +
    'INSERT INTO watering_level (watering_level)' +
    "VALUES ('Medium');" +
    'INSERT INTO watering_level (watering_level)' +
    "VALUES ('High');" +*/
    'CREATE TABLE IF NOT EXISTS plants' +
    '(id SERIAL PRIMARY KEY,' +
    'plant_name varchar(80),' +
    'plant_type int,' +
    'plant_variety varchar(80),' +
    'description varchar(140),' +
    'watering_level int,' +
    'CONSTRAINT type FOREIGN KEY (plant_type) REFERENCES plant_type(id),' +
    'CONSTRAINT watering_level FOREIGN KEY (watering_level) REFERENCES watering_level(id));' +
    'CREATE TABLE IF NOT EXISTS garden_plants' +
    '(id SERIAL PRIMARY KEY,' +
    'garden int,' +
    'plant int,' +
    'date_planted varchar(80),' +
    'date_harvested varchar(80),' +
    'notes varchar(300),' +
    'CONSTRAINT garden FOREIGN KEY (garden) REFERENCES gardens(id),' +
    'CONSTRAINT plant FOREIGN KEY (plant) REFERENCES plants(id));');

  query.on('end', function() {
    console.log('successfully ensured schema exists');
    done();
  });

  query.on('error', function() {
    console.log('Error creating schema!');
    // TODO exit(1) - find error
    done();
  });
  }
});


module.exports = connectionString;
