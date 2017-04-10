var http = require('http');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var stream = require('./stream.js');
var url = require("url");

var PORT = 3000;

var app = express();

app.use(stream);
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
  socket.emit('news', { hello: 'world' });
  socket.on('response', function(){
    socket.emit('news', { hello: 'world' });
  })
});

function sendLog(){
  setInterval(function(){
    socket.emit('news', { hello: 'world' });
  },100)
}

server.listen(PORT, function(){
  console.log('Node logger is activated, Visit port #'+PORT);
});
