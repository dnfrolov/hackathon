'use strict';

var model = require('./model'),
    async = require('async'),
    EmailService = require('../email/emailer'),
    AccountController = require('../account/controller');

exports._cleanUserArgs = function _cleanUserArgs(args, callback) {
    var primaryUserToAccountId = null,
        userAccounts = [];

    if (args && args.accounts && Array.isArray(args.accounts)) {
        args.accounts.forEach(function(account) {
            if (account.isPrimary) {
                primaryUserToAccountId = account.account._id;
            }

            userAccounts.push({
                account: account.account._id,
                userRole: account.userRole,
                isPrimary: account.isPrimary
            });
        });
    }

    if (!args) {
        args = {};
    }

    args.accounts = userAccounts;

    return callback(null, args, primaryUserToAccountId);
};

/**
 * Skeleton for creation and updating
 * @param args
 * @param action with args (args, primaryUserToAccountId, userAccounts, callback)
 * @param callback
 * @private
 */

var _createOrUpdate = exports._createOrUpdate = function _createOrUpdate(args, action, callback) {

    async.waterfall([
        function(callback) {
            exports._cleanUserArgs(args, callback);
        },
        action,
        function(user, id, callback) {
            if (!id) {
                return callback(null, user);
            }

            var accountData = {
                primaryAdmin: user
            };

            return AccountController.updateAccount(id, accountData, callback);
        }
    ], callback);

};

exports.getUsers = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');
    params.population = 'accounts.account';

    model.getList(params, done);
};

exports.addUser = function(data, done) {
    _createOrUpdate(data, function(args, primaryUserToAccountId, done) {
        model.addItem(args, function(err, user) {
            done(err, user, primaryUserToAccountId);
        });
    }, done);
};

exports.getUser = function(userId, done) {
    model.getItem({
        args: userId,
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.getUserByName = function(userName, done) {
    model.getItem({
        args: {
        username: userName
        },
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.getUserForAuth = function(args, done) {
    model.getItem({
        args: args
    }, done);
};

exports.updateUser = function(userId, data, done) {
    model.updateItem(userId, data, done);
};

exports.deleteUser = function(userId, done) {
    model.deleteItem(userId, done);
};

exports.updateGridUser = function(userId, data, done) {
    _createOrUpdate(data, function(args, primaryUserToAccountId, done) {
        model.updateItem(userId, data, done);

        model.updateUser(userId, args, function(err, user) {
            done(err, user, primaryUserToAccountId);
        });
    }, done);
};

exports.resetPassword = function(code, newPassword, done) {
    model.resetPassword(code, newPassword, done);
};

exports.getCode = function(username, done) {
    async.waterfall([
        function(next) {
            model.updateConfirmCode(username, next);
        },
        function(user, next) {
            var hash = user.confirmationDetails.code;

            EmailService.send({
                user: user,
                template: 'reset-password',
                subject: 'Reset your eTouches password',
                data: {
                    confirmationCode: hash
                }
            }, next);
        }
    ], done);
};


exports.checkConfirmationCode = function(code, done) {
    model.checkConfirmationCode(code, done);
};
