var fs = require('fs');
var mime = require('mime');

function route(pathname, response) {
    var filename;
    console.log("Router: About to route a request for " + pathname);

    if (pathname === "/") {
        pathname = "/index.html"
    }

    filename = __dirname + '/../client' + pathname;

    fs.exists(filename, function(exists) {
        if (exists) {
            response.writeHead(200, {"Content-Type": mime.lookup(filename)});
            fs.createReadStream(filename).pipe(response);
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("Sorry, not found.");
        }
    });
}

exports.route = route;
