var express  = require('express');
var app      = express();
var port     = process.env.PORT || 7331;
var morgan   = require('morgan');

// get db up
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
// get mongo connected
mongoose.connect(configDB.url); 

// traceroute utilitiy
var traceroute = require('traceroute');

// do shit, log shit, thug life
app.use(morgan('dev'));
app.set('view engine', 'jade');

// serve some static files
app.use(express.static('assets'));

// routes
app.get("/", function(req, res) {
  res.render("index.jade", 
  {
    userip : req._remoteAddress
  });
  
  traceroute.trace('31.192.117.132', function (err,hops) {
    console.log("Here comes the trace: ");  
    if (!err) 
      console.log(hops);
    else console.log(err);
  });
})


app.listen(port);
console.log("We are now bouncing bits on " + port);