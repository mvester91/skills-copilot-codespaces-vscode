// Create web server
var express = require('express');
var app = express();

// Create server
var server = require('http').createServer(app);

// Create socket
var io = require('socket.io').listen(server);

// Create array for comments
var comments = [];

// Set port for server
server.listen(3000);

// Set path for static files
app.use(express.static(__dirname + '/public'));

// Set path for index.html
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Listen for connection
io.sockets.on('connection', function(socket) {
	console.log('Socket connected');

	// Emit comments
	socket.emit('load comments', comments);

	// Listen for add comment
	socket.on('add comment', function(data) {
		comments.push(data);
		io.sockets.emit('load comments', comments);
	});

	// Listen for delete comment
	socket.on('delete comment', function(index) {
		comments.splice(index, 1);
		io.sockets.emit('load comments', comments);
	});
});