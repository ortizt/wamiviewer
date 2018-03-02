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

    fs.readdir(__dirname + '/images', (err, files) => {
    
        var temp = files.slice(0);
        var temp2 = [];
        console.log(temp)
        for (var i = 0; i < files.length; i++) {
            fs.readFile(__dirname + '/images/' + files[i], function(err, buf){
                
                socket.emit('image', {image: true, buffer: buf.toString('base64') }, temp);
                console.log('image file is initialized');
            }); 
        }
      });

  });
