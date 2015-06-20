'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getVenues({
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
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            postalCode: req.body.postalCode,
            state: req.body.state,
            country: req.body.country ? req.body.country._id : ''
        };

        controller.addVenue(data, function(err, venue) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(venue);
        });
    });

router.route('/search')
    .get(function(req, res) {
        controller.searchVenues({
            location: req.query.location || null,
            name: req.query.name || null,
            eventId: req.query.eventId || null
        }, function(err, venues) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(venues);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        controller.getVenue(req.params.id, function(err, venue) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(venue);
        });
    })
    .put(function(req, res) {
        var data = {
            name: req.body.name,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            postalCode: req.body.postalCode,
            state: req.body.state,
            country: req.body.country ? req.body.country._id : ''
        };

        controller.updateVenue(req.params.id, data, function(err, venue) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(venue);
        });
    })
    .delete(function(req, res) {
        controller.deleteVenue(req.params.id, function(err, venue) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(venue);
        });
    });

module.exports = router;
