'use strict';

var model = require('./model');

exports.getQuestions = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    return model.getList(params, done);
};

exports.addQuestion = function(data, done) {
    return model.addItem(data, done);
};

exports.getQuestion = function(userId, done) {
    model.getItem({
        args: userId
    }, done);
};

exports.updateQuestion = function(userId, data, done) {
    model.updateItem(userId, data, done);
};

exports.deleteQuestion = function(userId, done) {
    model.deleteItem(userId, done);
};
