var events = require('events');
var eventEmitter = new events.EventEmitter();

var fs = require('fs');
var google = require('googleapis');

var googleConfig = require(__dirname + '/../config/google.json');

var analytics;
var authClient;

var start = function() {
    eventEmitter.on("authorized", initializeAnalytics);
    eventEmitter.on("analyticsInitialized", requestRealTimeData);
    authorize();
};

var initializeAnalytics = function() {
    analytics = google.analytics({
        version: 'v3',
        auth: authClient
    });

    eventEmitter.emit('analyticsInitialized');
};

var authorize = function() {
    var keypath = __dirname + '/../config/' + googleConfig.keypath;
    var key = fs.readFileSync(keypath).toString();
    var scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

    authClient = new google.auth.JWT(
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

        eventEmitter.emit('authorized');
    });
};

var requestRealTimeData = function() {
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
