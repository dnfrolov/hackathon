'use strict';

var model = require('./model'),
    util = require('../../libs/util'),
    EventController = require('../event/controller'),
    _ = require('lodash');

exports.getVenues = function (params, done) {
    params = params || {};

    model.getList(params, done);
};

exports.addVenue = function (data, done) {
    model.addItem(data, done);
};

exports.getVenue = function (args, done) {
    model.getItem(args, done);
};

exports.updateVenue = function (venueId, data, done) {
    model.updateItem(venueId, data, done);
};

exports.deleteVenue = function (venueId, done) {
    model.deleteItem(venueId, done);
};

exports.searchVenues = function (args, done) {
    var filter = {
            $or: [],
            deleted: false
        },
        locationSearch = {};

    if(args.name) {
        filter.$or.push({name: new RegExp(args.name, 'i')});
    }

    if(args.location) {
        locationSearch = util.prepareSearch(args.location, model, 'location');
        if(locationSearch && locationSearch.$or) {
            filter.$or = _.union(filter.$or, locationSearch.$or);
        }
    }

    if(!filter.$or.length) {
        return done(null, {});
    }

    EventController.getEventVenues(args.eventId, false, function(err, list) {
        if(err) {
            return done(err);
        }

        if(list) {
            filter._id = { $nin: list};
        }

        model.find(filter, done);
    });
};