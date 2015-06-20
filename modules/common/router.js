'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/timezone')
    .get(function(req, res) {
        controller.getTimezones({}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

router.route('/dateFormats')
    .get(function(req, res) {
        controller.getDateFormats({}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

router.route('/timeFormats')
    .get(function(req, res) {
        controller.getTimeFormats({}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

router.route('/country')
    .get(function(req, res) {
        controller.getCountries({}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

module.exports = router;
