var http = require('http');
var url = require("url");

function start(route, socket) {

    var server = http.createServer(function(request, response) {
        var pathname = url.parse(request.url, true).pathname;
        console.log("Request received: "+pathname);

        route(pathname, response);
    });

    console.log(socket);

    socket(server);

    server.listen(8888);

    console.log("Server started and waiting for connections.");
}

exports.start = start;