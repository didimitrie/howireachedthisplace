var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8765;
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
 var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 ip = ip.split(",")[0];
 ip = ip.replace("::ffff:", "");

 traceroute.trace(ip, function (err,hops) {
    //console.log("Here comes the trace: "); 
    //console.log(req);
    
    console.log("client ip is: " + ip);
    if (!err) {
      res.render("index.jade", {
        userip : ip,
        //hops : JSON.stringify(hops, null, 4),
        hops : hops,
        request : req
      })
    }
    else {
      res.render("index.jade", {
        userip : ip,
        hops : "Soz, there was an error... :/",
        request : req
      })
    }
  }); 
})


app.listen(port);
console.log("We are now bouncing bits on " + port);