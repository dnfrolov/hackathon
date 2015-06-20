'use strict';

var router = require('express').Router();

router.route('/').get(function (req, res) {
    res.success([
        {
            _id: 1,
            name: 'Trial'
        },
        {
            _id: 2,
            name: 'Internal'
        },
        {
            _id: 3,
            name: 'Live'
        }
    ]);
});

module.exports = router;
