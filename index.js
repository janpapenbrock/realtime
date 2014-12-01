var server = require("./server/server");
var router = require("./server/router");
var emitter = require("./server/emitter.js");
var socket = require("./server/socket.js");

var httpServer = server.start(router.route);

var io = socket.start(httpServer);

emitter.start(io);



