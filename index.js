var server = require("./server/server");
var router = require("./server/router");
var socket = require("./server/socket.js");

var httpServer = server.start(router.route);

var io = socket.start(httpServer);

var realtime = require('./server/realtime.js');
realtime.start(io);


