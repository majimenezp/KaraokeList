
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
var mongoose=require("mongoose");
var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration
mongoose.connect("mongodb://127.0.0.1/Karaoke");
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
//app.set('view options', { layout: false });
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
io.set('log level', 1); // reduce logging

// Routes
var conexionCliente=io.sockets.on('connection', function (socket) {
    socket.on('evento cliente', function (data) {
        console.log("El cliente dice que si llego");
    });
});

app.get('/', routes.index);
require('./routes/indexar')(app,conexionCliente);
require('./routes/busqueda')(app,conexionCliente);




app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
