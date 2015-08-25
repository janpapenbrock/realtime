var http = require('http');
var fs = require('fs');

exports.download = function(profile) {
    var path = __dirname + "/../client" + profile.favicon;

    var file = fs.createWriteStream(path, { flags: "wx" });

    file.on("error", function(err) {});

    file.on("open", function() {
       console.log("Downloading favicon " + path);

        var request = http.get(
            "http://www.google.com/s2/favicons?domain=" + profile.domain,
            function(response) {
                response.pipe(file);
            }
        );
    });
};
