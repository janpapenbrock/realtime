var infiniteLoop = require(__dirname + '/infinite-loop.js');
var queue = [];

var add = function(value) {
    queue.push(value);
};

var iteration = function(callback) {
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

exports.add = add;
exports.loop = loop;
