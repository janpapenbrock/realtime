var analytics = require('./analytics.js');

var googleConfig = require(__dirname + '/../config/google.json');

function start() {
    analytics(requestRealTimeData);
}

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
