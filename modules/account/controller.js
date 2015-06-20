'use strict';

var model = require('./model'),
    util = require('../../libs/util');

exports.getAccounts = function (params, done) {
    params = params || {};

    if (params.query) {
        params.filter = util.prepareSearch(params.query, model);
    }

    model.getList(params, done);
};

exports.addAccount = function (data, done) {
    model.addItem(data, done);
};

exports.getAccount = function (args, done) {
    model.getItem(args, done);
};

exports.updateAccount = function (accountId, data, done) {
    model.updateItem(accountId, data, done);
};

exports.deleteAccount = function(accountId, done) {
    model.deleteItem(accountId, done);
};