'use strict';

var model = require('./model');

exports.getEvents = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');

    model.getEvents(params, done);
};

exports.addEvent = function(data, done) {
    model.addItem(data, done);
};

exports.getEvent = function(eventId, done) {
    model.getItem({
        args: { _id: eventId },
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.updateEvent = function(eventId, data, done) {
    model.updateItem(eventId, data, done);
};

exports.deleteEvent = function(eventId, done) {
    model.deleteItem(eventId, done);
};

exports.updateEventVenues = function(eventId, data, done) {
    model.findByIdAndUpdate(eventId, {$addToSet: {venues: data}}, {upsert: true}, done);
};

exports.removeEventVenues = function(eventId, data, done) {
    model.findByIdAndUpdate(eventId, {$pull: {venues: data}}, done);
};

exports.getEventVenues = function(eventId, populate, done) {
    var filter = {
        args: { _id: eventId },
        fields: 'venues'
    };

    if(populate) {
        filter.populate = 'venues';
    }

    model.getItem(filter, function(err, item) {
        if(err) {
            return done(err);
        }

        return done(null, item.venues);
    });
};
