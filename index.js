const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const {resolve} = require("path");

app.get('/', (req, res) => {
  res.sendFile(resolve('index.html'));
});

app.get('/get.html', (req, res) => {
  res.sendFile(resolve('get.html'));
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

   socket.on('rq_get', function () {
      console.log('RQ get received');
      socket.emit('rq_ack', 'RQ get ack')
   });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});