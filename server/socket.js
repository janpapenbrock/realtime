var io = require('socket.io');
var emitter = require("./emitter.js");

function start(server) {
    io = io(server);

    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    emitter.start(io);
};

exports.start = start;