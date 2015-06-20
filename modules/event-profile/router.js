'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getEventProfiles({
            skip: req.query.skip || 0,
            limit: req.query.limit || 10,
            sort: req.query.sort || null,
            query: req.query.query || null,
            filter: req.query.filter || {}
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
            status: req.body.status,
            lastModified: new Date()
        };

        controller.addEventProfile(data, function(err, eventProfile) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(eventProfile);
        });
    });

router.route('/:eventProfile')
    .get(function(req, res) {
        controller.getEventProfile(req.params.eventProfile, function(err, eventProfile) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(eventProfile);
        });
    })
    .put(function(req, res) {
        var _id = req.params.eventProfile,
            data = {
                name: req.body.name,
                code: req.body.code,
                lastModified: new Date()
            };

        controller.updateEventProfile(_id, data, function(err, eventProfile) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(eventProfile);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.eventProfile;

        controller.deleteEventProfile(_id, function(err, eventProfile) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(eventProfile);
        });
    });

module.exports = router;
