'use strict';

var model = require('./model');

exports.getTags = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    return model.getList(params, done);
};

exports.addTag = function(data, done) {
    return model.addItem(data, done);
};

exports.getTag = function(tagId, done) {
    model.getItem({
        args: tagId
    }, done);
};

exports.updateTag = function(tagId, data, done) {
    model.updateItem(tagId, data, done);
};

exports.deleteTag = function(tagId, done) {
    model.deleteItem(tagId, done);
};
