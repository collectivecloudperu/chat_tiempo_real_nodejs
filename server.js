var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server),
      mensajes = [],
      sockets = [];

app.use( express.static(__dirname + '/public'));

server.listen(process.env.PORT || 4000)

io.sockets.on('connection', function (socket) {

  sockets.push(socket);

  socket.emit('messages-available', mensajes);

    socket.on('add-message', function (data) {
      mensajes.push(data);
      sockets.forEach(function (socket) {
        socket.emit('message-added', data);
      });
   });
});