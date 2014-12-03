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
    var accountIds = googleConfig.account.include || [];

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

            data.items.filter(isProfileNotExcluded).forEach(addProfile);
        });
    });
};

var isProfileNotExcluded = function(profile) {
    var excludedWebProperties = googleConfig.webProperty.exclude || [];
    var excludedProfiles      = googleConfig.profile.exclude || [];

    if (excludedWebProperties.indexOf(profile.webPropertyId) > -1) {
        return false;
    }

    if (excludedProfiles.indexOf(profile.id) > -1) {
        return false;
    }

    return true;
};

var addProfile = function(profile) {
    var reducedProfile = {
        id:         profile.id,
        websiteUrl: profile.websiteUrl,
        name:       profile.name
    };

    profiles.push(reducedProfile);
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
        if (err) {
            console.log(err);
            return;
        }

        if (data.totalsForAllResults) {
            profile.activeUsers = data.totalsForAllResults['rt:activeUsers'];
            console.log(profile.name);
            console.log(profile.activeUsers);

            io.emit('data-update', { profile: profile });
        }
    });
};

exports.start = start;
