'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        var folders = req.query.folders,
            filter = req.query.filter || null;

        if (filter) {
            if (Array.isArray(filter)) {
                filter.forEach(function(element, index) {
                    filter[index] = JSON.parse(element);
                });
            } else {
                filter = [JSON.parse(filter)];
            }
        }

        controller.getEvents({
            skip: req.query.skip || 0,
            limit: req.query.limit || 10,
            sort: req.query.sort || null,
            query: req.query.query || null,
            filter: filter,
            folders: folders || null
        }, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    })
    .post(function(req, res) {
        var data = {
            name: req.body.name,
            profile: req.body.profile._id,
            folder: req.body.folder._id,
            status: 1 //Design status TODO: use constant
        };

        controller.addEvent(data, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(event);
        });
    });

router.route('/:event')
    .get(function(req, res) {
        controller.getEvent(req.params.event, function(err, event) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(event);
        });
    })
    .put(function(req, res) {
        var _id = req.params.event,
            data = {
                name: req.body.name,
                code: req.body.code,
                profile: req.body.profile._id,
                folder: req.body.folder._id,
                status: req.body.status._id,
                description: req.body.description,
                timezone: req.body.timezone._id,
                startDateTime: req.body.startDateTime,
                endDateTime: req.body.endDateTime,
                registrationCloseDateTime: req.body.registrationCloseDateTime,
                settings: req.body.settings
            };

        controller.updateEvent(_id, data, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(event);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.event;

        controller.deleteEvent(_id, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(event);
        });
    });

router.route('/:event/venues')
    .delete(function(req, res) {
        var _id = req.params.event,
            data = req.query.venues;

        controller.removeEventVenues(_id, data, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(event);
        });
    })
    .get(function(req, res) {
        var _id = req.params.event;

        controller.getEventVenues(_id, true, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(event);
        });
    })
    .put(function(req, res) {
        var _id = req.params.event,
            data = req.body.venues;

        controller.updateEventVenues(_id, data, function(err, event) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(event);
        });
    });

module.exports = router;
