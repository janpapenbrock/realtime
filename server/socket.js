var io = require('socket.io');

function start(server) {
    io = io(server);

    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    return io;
};

exports.start = start;
