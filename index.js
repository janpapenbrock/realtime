var server = require("./server/server");
var router = require("./server/router");

var socket = require("./server/socket.js");

server.start(router.route, socket.start);