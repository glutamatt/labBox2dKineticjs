var io = require('socket.io').listen(8080);

var socketgame;

var game = io.of('/game')
  .on('connection', function (socket) {
	 socketgame = socket ;
	 console.log("game connected");
  });

var weapon = io
  .of('/weapon')
  .on('connection', function (socket) {
	  console.log("weapon connected");
    socket.on('fire', function(shoot){  socketgame.emit('fire', shoot); });
  });