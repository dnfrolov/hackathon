'use strict';

var router = require('express').Router();

router.route('/')
    .get(function (req, res) {
        return res.success(req.user);
    });

module.exports = router;
