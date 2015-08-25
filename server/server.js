var http = require('http');
var url = require("url");

function start(route) {

    var server = http.createServer(function(request, response) {
        var pathname = url.parse(request.url, true).pathname;
        console.log("HTTP: Request received: "+pathname);

        route(pathname, response);
    });

    server.listen(8888);

    console.log("HTTP: Server started and waiting for connections.");

    return server;
}

exports.start = start;
