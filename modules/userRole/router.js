'use strict';

var router = require('express').Router();

router.route('/').get(function (req, res) {
    res.success([
        { _id: 1, name: 'Admin'},
        { _id: 2, name: 'User'}
    ]);
});

module.exports = router;
