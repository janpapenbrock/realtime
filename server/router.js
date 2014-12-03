var fs = require('fs');
var mime = require('mime');

function route(pathname, response) {
    var filename;
    console.log("Router: About to route a request for " + pathname);

    if (pathname === "/") {
        pathname = "/index.html"
    }

    var headers = {};

    if (pathname.match(/favicons/g)) {
        headers["Cache-Control"] = "public, max-age=31536000";
    }

    filename = __dirname + '/../client' + pathname;

    fs.exists(filename, function(exists) {
        if (exists) {
            headers["Content-Type"] = mime.lookup(filename);

            response.writeHead(200, headers);
            fs.createReadStream(filename).pipe(response);
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("Sorry, not found.");
        }
    });
}

exports.route = route;
