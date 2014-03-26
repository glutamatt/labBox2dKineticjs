
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.use(express.static('public'));
app.get('/', function(req, res) {res.sendfile('weapon.html');});
app.get('/game', function(req, res) {res.sendfile('game.html');});

server.listen(8008);

var socketgame;
var socketPlayer1;
var socketPlayer2;

var game = io.of('/game')
  .on('connection', function (socket) {
	 socketgame = socket ;
	 console.log("game connected");
  });

var weapon = io
  .of('/weapon')
  .on('connection', function (socket) {
	  if ( !socketPlayer1) {
		  socketPlayer1 = socket;
		  socket.player = 1 ;
	  }
	  else {
		  if (!socketPlayer2) {
			  socketPlayer2 = socket ;
			  socket.player = 2 ;
		  }
		  else return ;
	  }
	  console.log("weapon connected");
	  socket.on('fire', function(shoot){  socketgame.emit('fire', {player : socket.player , shoot:shoot}); });
  });