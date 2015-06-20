'use strict';

var emailer = require('nodemailer'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    config = require('../config'),
    async = require('async');

// Do not remove.
// var queue = require('./email-queue');

exports.options = {};

exports.data = {};

exports.attachments = [{
    fileName: 'logo.png',
    filePath: './public/images/email/logo.png',
    cid: 'logo@myapp'
}];

/**
 * Set options before sending
 * @param options
 * @param data
 */
exports.setOptions = function(options, data) {
    this.options = options || {};
    this.data = data || {};
};

exports.send = function (callback) {
    var templateName = this.options.template || 'default',
        _this = this,
        messageData = {
            to: this.options.to.name + ' ' +
                this.options.to.surname +
                ' <' + this.options.to.email + '>',
            from: config.email.from,
            subject: this.options.to.subject,
            html: '',
            generateTextFromHTML: true
        };

    async.parallel({
            html: function (callback) {
                _this.getHtml(templateName, _this.data, callback);
            },
            transport: function (callback) {
                callback(null, _this.getTransport());
            }
        },
        function (err, results) {
            messageData.html = results.html;
            results.transport.sendMail(messageData, callback);

            // Do not remove.
            // queue.send(messageData, callback);
        });
};

exports.getTransport = function () {
    return emailer.createTransport(config.email.transport, {
        host: config.email.host,
        port: config.email.port,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });
};

exports.getHtml = function (templateName, data, callback) {
    var html,
        templatePath = path.join(__dirname, '../', config.email.templateDirectory, templateName + '.ejs');

    fs.readFile(templatePath, 'utf8', function (err, res) {
        if (err) {
            return callback(err);
        }

        html = _.template(res, data);

        callback(err, html);
    });
};

exports.getAttachments = function (html) {
    var attachment, attachments, _i, _len, _ref;
    attachments = [];
    _ref = this.attachments;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attachment = _ref[_i];
        if (html.search('cid:' + attachment.cid) > -1) {
            attachments.push(attachment);
        }
    }
    return attachments;
};
