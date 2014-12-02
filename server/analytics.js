var fs = require('fs');
var google = require('googleapis');

var googleConfig = require(__dirname + '/../config/google.json');

module.exports = function(next) {
    authorize(forward(initializeAnalytics, next));
};

function forward(first, next) {
    return function(err, result) {
        first(err, result, next)
    }
}

var initializeAnalytics = function(err, authClient, next) {
    var analytics = google.analytics({
        version: 'v3',
        auth: authClient
    });

    next(null, analytics);
};

var authorize = function(next) {
    var keyPath = __dirname + '/../config/' + googleConfig.keyPath;
    var key = fs.readFileSync(keyPath).toString();
    var scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

    var authClient = new google.auth.JWT(
        googleConfig.email,
        keyPath,
        key,
        scopes
    );

    console.log("Analytics: Authorization started.");

    authClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log("Analytics: Authorized.");

        next(null, authClient);
    });
};
