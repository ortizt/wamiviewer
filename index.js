var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(server);
var fs = require('fs'); // required for file serving

server.listen(port, function() {
    console.log('listening on *:' + port);
});

app.use(express.static(__dirname));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A user has connected: ' +socket.id);
    // var readStream = fs.createReadStream(path.resolve(__dirname, '/image.jpg'), {
    //     encoding: 'binary'
    // }), chunks = [];

    // readStream.on('readable', function (){
    //     console.log('Image loading');
    // });

    // readStream.on('data', function(chunk) {
    //     chunks.push(chunk);
    //     socket.emit('img-chunk', chunk);
    // });

    // readStream.on('end', function(){
    //     console.log('Image loaded');
    // });

  });

  io.on('connection', function(socket){
    fs.readFile(__dirname + '/image.jpg', function(err, buf){
        // it's possible to embed binary data
        // within arbitrarily-complex objects
        socket.emit('image', { image: true, buffer: buf.toString('base64') });
        console.log('image file is initialized');
    });
  });