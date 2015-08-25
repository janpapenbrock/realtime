module.exports = function(callback, repeatTimeout, initialTimeout) {
    if (!repeatTimeout) {
        repeatTimeout = 0;
    }
    if (!initialTimeout) {
        initialTimeout = repeatTimeout;
    }

    function loop() {
        setTimeout(loop, repeatTimeout);
        callback();
    }

    setTimeout(loop, initialTimeout);
};
