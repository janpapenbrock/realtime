var fs = require('fs');
var google = require('googleapis');

var googleConfig = require('../config/google.json');

var isAuthorized = false;

function analytics() {
    var analytics = google.analytics({
        version: 'v3',
        auth: authClient()
    });

    return analytics;
}

function authClient() {
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
        if (err) throw err;

        isAuthorized = true;
    });

    return authClient;
}

function start() {

    var params = {
        ids:     googleConfig.tableId,
        metrics: 'rt:activeUsers',
    };

    var al = analytics();

    setTimeout (function() {

        if (!isAuthorized) {
            return;
        }

        al.data.realtime.get(params, function(err, data) {
            console.log(err);
            console.log(data);
        });

    }, 2000);

}

start()
