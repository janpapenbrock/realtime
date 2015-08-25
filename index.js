var server = require("./server/server");
var router = require("./server/router");
var socket = require("./server/socket.js");

var httpServer = server.start(router.route);

var io = socket.start(httpServer);

if (true) {
    var realtime = require('./server/realtime.js');
} else {
    var realtime = require('./server/realtime-simulator.js');
}
realtime.start(io);


