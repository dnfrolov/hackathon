'use strict';

var router = require('express').Router();

router.route('/').get(function (req, res) {
    res.success([
        { _id: 1, name: 'Internal'},
        { _id: 2, name: 'External'}
    ]);
});

module.exports = router;
