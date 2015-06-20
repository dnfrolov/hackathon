'use strict';

var model = require('./model');

exports.getGoals = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    return model.getList(params, done);
};

exports.addGoal = function(data, done) {
    return model.addItem(data, done);
};

exports.addGoals = function(data, done) {
    return model.addItems(data, done);
};

exports.getGoal = function(userId, done) {
    model.getItem({
        args: userId
    }, done);
};

exports.updateGoal = function(userId, data, done) {
    model.updateItem(userId, data, done);
};

exports.deleteGoal = function(userId, done) {
    model.deleteItem(userId, done);
};
