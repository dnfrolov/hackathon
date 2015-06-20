'use strict';

var queue = require('./queue');

exports.send = function (message, callback) {
    queue.send('email', 'send', message, {}, callback);
};
