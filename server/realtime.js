var analytics = require('./analytics.js');

var googleConfig = require(__dirname + '/../config/google.json');

var io;

function start(ioStream) {
    io = ioStream;
    analytics(requestRealTimeData);
    analytics(requestProfiles);
}

var profiles = [];

var requestProfiles = function(err, analytics) {
    var accountIds = googleConfig.accountIds || [];

    accountIds.forEach(function(accountId) {
        var params = {
            accountId: accountId,
            webPropertyId: '~all',
            "max-results": 200
        };

        analytics.management.profiles.list(params, function(err, data) {
            if (err) {
                return err;
            }

            data.items.forEach(function(profile) {

                var reducedProfile = {
                    id:         profile.id,
                    websiteUrl: profile.websiteUrl,
                    name:       profile.name
                };

                profiles.push(reducedProfile);
            });
        });
    });
};

var requestRealTimeData = function(err, analytics) {
    var loop = require(__dirname + '/../lib/queue-loop.js');

    loop.replace(profiles);

    loop.loop(function(profile) {
        requestRealTimeDataForProfile(analytics, profile)
    }, 250, 1000);
};

var requestRealTimeDataForProfile = function(analytics, profile) {
    var params = {
        ids:     "ga:" + profile.id,
        metrics: 'rt:activeUsers'
    };

    analytics.data.realtime.get(params, function(err, data) {
        if (data.totalsForAllResults) {
            profile.activeUsers = data.totalsForAllResults['rt:activeUsers'];
            console.log(profile.name);
            console.log(profile.activeUsers);

            io.emit('data-update', { profile: profile });
        }
    });
};

exports.start = start;
