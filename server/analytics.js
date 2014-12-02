var fs = require('fs');
var google = require('googleapis');

var googleConfig = require(__dirname + '/../config/google.json');

module.exports = function(next) {
    authorize(forward(initializeAnalytics, next));
};

var analytics;
var authClient;

function forward(first, next) {
    return function(err, result) {
        first(err, result, next)
    }
}

var initializeAnalytics = function(err, authClient, next) {
    if (!analytics) {
        analytics = google.analytics({
            version: 'v3',
            auth: authClient
        });
    }

    next(null, analytics);
};

var authorize = function(next) {
    var keypath = __dirname + '/../config/' + googleConfig.keypath;
    var key = fs.readFileSync(keypath).toString();
    var scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

    if (!authClient) {
        authClient = new google.auth.JWT(
            googleConfig.email,
            keypath,
            key,
            scopes
        );

        authClient.authorize(function (err, tokens) {
            if (err) {
                console.log(err);
                throw err;
            }

            next(null, authClient);
        });
    } else {
        next(null, authClient);
    }
};
