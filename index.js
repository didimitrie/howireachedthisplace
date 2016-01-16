var express  = require('express');
var app      = express();
var port     = process.env.PORT || 7331;
var morgan   = require('morgan');
// <3 nosql
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
// get mongo connected
mongoose.connect(configDB.url); 

// traceroute utilitiy
var traceroute = require('traceroute');



// log shit into eternity
app.use(morgan('dev'));
app.set('view engine', 'jade');

// serve some static files
app.use(express.static('assets'));

// routes
app.get("/", function(req, res) {
  console.log(req);
  res.render("index.jade", 
    {
      // no data yet.
    });
})


app.listen(port);
console.log("We are now bouncing bits on " + port);