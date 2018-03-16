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
    var temp2 = [];
    fs.readdir(__dirname + '/images', (err, files) => {
    
        var temp = files.slice(0);
        temp2 = temp;
        // console.log(temp)
        socket.emit('images', temp);
        // for (var i = 0; i < files.length; i++) {
        //     fs.readFile(__dirname + '/images/' + files[i], function(err, buf){
                
        //         socket.emit('image', {image: true, buffer: buf.toString('base64') }, temp);
        //         console.log('image file is initialized');
        //     }); 
        // }
      });
      socket.on('selected', (selection, count) => {
        //   console.log(temp2)
          console.log(selection)
          fs.readdir(__dirname + '/images/' + selection, (err, files) => {
            // console.log(files)
            var temp = files.slice(0);
            // console.log(temp)
            // for (count; count < files.length; count++) {
            while(true) {
                // console.log(files.length)
                var j = 0
                // console.log(i)
                fs.readFile(__dirname + '/images/' + selection + '/' + files[j], function(err, buf){
                    socket.emit('image', {image: true, buffer: buf.toString('base64') }, count);
                    console.log('image file sent');
                    // console.log(i)
                    if (j == files.length-1) {
                        console.log('no more images')
                    } 
                });
                console.log(j)
                j += 1
            }
          });
      })

  });
