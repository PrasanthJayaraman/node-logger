var http = require('http');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var url = require("url");

var logArray = [];

var PORT = 3000;

var app = express();

app.use('/public', express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, '/public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res, next){
  res.render('home', {data: {name: 'Prasanth Jayaraman'}})
});

var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.emit('online', { timer: new Date().toISOString(), message: 'Listening to node logger' });

   socket.on('start', function(){
     var data;
     if(logArray && logArray.length >= 1){
       data = logArray.pop();
       console.log(data);
       socket.emit('online', { timer: data.timer, message: data.message });
     }
   })
});

function info(info){
  logArray.push({timer : new Date().toISOString(), message : info});
}

function startLogger(){
  server.listen(PORT, function(){
    console.log('Node logger is activated, Visit port #'+PORT);
  });
}

exports.startLogger = startLogger;
exports.info = info;
