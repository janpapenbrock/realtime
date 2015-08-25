var loop = require(__dirname + '/../lib/queue-loop.js');
var faviconLoader = require('./favicon.js');

function createProfile() {
    var id = Math.ceil(Math.random() * 1000);

    var profile = {
        id:         id,
        websiteUrl: id + ".example.com",
        name:       "example.com " + id,
        domain:     "example.com",
        favicon:    "/favicons/123.png"
    };

    setTimeout(function() {
        faviconLoader.download(profile);
    }, 0);

    return profile;
};

function updateActiveUsers(profile) {
    var activeUsers = profile.activeUsers || 0;
    activeUsers += Math.ceil(Math.random() * 3);
    activeUsers -= Math.ceil(Math.random() * 3);
    activeUsers = Math.max(0, activeUsers);
    profile.activeUsers = activeUsers;
};

function start(io) {
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());
    loop.add(createProfile());

    loop.loop(
        function(profile) {
            updateActiveUsers(profile);
            io.emit('data-update', { profile: profile });
        },
        1000,
        1000
    );
}

exports.start = start;
