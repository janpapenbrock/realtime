var io = require('socket.io');

function start(server) {
    io = io(server);

    io.on('connection', function(socket) {
        console.log('Socket: A user connected.');

        socket.on('disconnect', function() {
            console.log('Socket: A user disconnected.');
        });
    });

    return io;
};

exports.start = start;
