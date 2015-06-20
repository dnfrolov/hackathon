'use strict';

var model = require('./model');

exports.getEventProfiles = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    model.getList(params, done);
};

exports.addEventProfile = function(data, done) {
    model.addItem(data, done);
};

exports.getEventProfile = function(eventProfileId, done) {
    model.getItem({
        args: eventProfileId,
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.updateEventProfile = function(eventProfileId, data, done) {
    model.updateItem(eventProfileId, data, done);
};

exports.deleteEventProfile = function(eventProfileId, done) {
    model.deleteItem(eventProfileId, done);
};
