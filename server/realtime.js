var fs = require('fs');
var google = require('googleapis');

var googleConfig = require(__dirname + '/../config/google.json');

var start = function() {
    authorize(forward(initializeAnalytics, requestRealTimeData));
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
    var keypath = __dirname + '/../config/' + googleConfig.keypath;
    var key = fs.readFileSync(keypath).toString();
    var scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

    var authClient = new google.auth.JWT(
        googleConfig.email, 
        keypath, 
        key,
        scopes
    );

    authClient.authorize(function(err, tokens) {
        if (err) {
            console.log(err);
            throw err;
        }

        next(null, authClient);
    });
};

var requestRealTimeData = function(err, analytics) {
    var params = {
        ids:     googleConfig.tableId,
        metrics: 'rt:activeUsers',
    };

    setTimeout (function() {
        analytics.data.realtime.get(params, function(err, data) {
            console.log(err);
            console.log(data);
        });

    }, 2000);
};

exports.start = start;
