'use strict';

var model = require('./model');

exports.getFolders = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    model.getList(params, done);
};

exports.addFolder = function(data, done) {
    model.addItem(data, done);
};

exports.getFolder = function(folderId, done) {
    model.getItem({
        args: folderId,
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.updateFolder = function(folderId, data, done) {
    model.updateItem(folderId, data, done);
};

exports.deleteFolder = function(folderId, done) {
    model.deleteItem(folderId, done);
};
