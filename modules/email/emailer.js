'use strict';

var emailer = require('../../libs/emailer');

/**
 * Send email immediately
 * @param options
 * @param done
 * @returns {*}
 */
exports.send = function (options, done) {
    emailer.setOptions({
        to: {
            email: options.user.primaryEmail,
            name: options.user.firstName,
            surname: options.user.lastName,
            subject: options.subject
        },
        template: options.template
    }, options.data);

    return emailer.send(done);
};
