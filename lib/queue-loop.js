var infiniteLoop = require(__dirname + '/infinite-loop.js');
var queue = [];

var replace = function(newQueue) {
    queue = newQueue;
};

var add = function(value) {
    queue.push(value);
};

var iteration = function(callback) {
    if (queue.length == 0) {
        return;
    }

    var item = queue.shift();
    queue.push(item);

    callback(item);
};

var loop = function(callback, repeatTimeout, initialTimeout) {
    infiniteLoop(
        function() { iteration(callback) },
        repeatTimeout,
        initialTimeout
    );
};

exports.replace = replace;
exports.add = add;
exports.loop = loop;
