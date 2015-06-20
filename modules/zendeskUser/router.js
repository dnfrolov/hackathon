'use strict';

var router = require('express').Router();

router.route('/').get(function (req, res) {
    res.success([]);
});

module.exports = router;
