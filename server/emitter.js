function start(io) {

    var views = [ 1, 2, 3 ];

    function getViewCounter (host, callback) {
        var data = host;
        // do sth
        callback(data);
    }
 
    function updateData () {
        view = views.shift();
        views.push(view);
     
        console.log("updateData: " + view);
     
        setTimeout (updateData, 1000) //queue for next ping in the next predefined interval
     
        getViewCounter(view, function (status) {
            io.emit('data-update', { content: status });
        });
    }

    setTimeout (updateData(), 2000);
}

exports.start = start;