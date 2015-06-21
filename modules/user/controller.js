'use strict';

var model = require('./model');

exports.getUsers = function(params, done) {
    params = params || {};
    // params.fields = model.getReadFilterKeys('public');

    return model.getList(params, done);
};

exports.addUser = function(data, done) {
    return model.addItem(data, done);
};

exports.getUser = function(userId, done) {
    model.getItem({
        args: userId
    }, done);
};

exports.getUserResponses = function(userId, done) {
    model.getItem({
        args: userId,
        fields: 'responses'
    }, done);
};

exports.getUserPrs = function(userId, done) {
    model.getItem({
        args: userId,
        fields: 'prs'
    }, done);
};

exports.updateUser = function(userId, data, done) {
    model.updateItem(userId, data, done);
};

exports.deleteUser = function(userId, done) {
    model.deleteItem(userId, done);
};
