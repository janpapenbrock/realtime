var loop = require(__dirname + '/../lib/queue-loop.js');

function start(io) {

    loop.add(1);
    loop.add(2);
    loop.add(3);

    loop.loop(
        function(view) {
            console.log(view);
            io.emit('data-update', { content: view });
        },
        1000,
        1000
    );
}

exports.start = start;
