'use strict';

var amqp = require('amqp'),
    config = require('../config'),
    logger = require('./log')(module),
    url = config.amqp.url,
    conn = amqp.createConnection({
        url: url
    }),
    connected = false,
    queue = [];

logger.info('connecting to queue ' + url);

exports.send = function (name, key, message, options, callback) {
    logger.debug('got message...');
    logger.debug(message);

    if (connected) {
        logger.info('fetching queue exchange');
        var exchange = conn.exchange(name);
        exchange.publish(key, message);
        callback();
    } else {
        logger.log('queue connection is not ready yet, message will be sent after connection is ready');
        queue.push({
            key: key,
            message: message,
            options: options,
            callback: callback
        });
    }
};

conn.on('ready', function () {
    var message;

    connected = true;

    logger.info('connection to queue ready');

    if (queue.length) {
        logger.info(queue.length + ' messages pending to be sent upon connection');
        while ((message = queue.shift())) {
            exports.send(message.key, message.message, message.options, message.callback);
        }
    }
});
