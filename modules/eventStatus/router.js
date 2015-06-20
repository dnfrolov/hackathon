'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getEventStatuses({}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

module.exports = router;
