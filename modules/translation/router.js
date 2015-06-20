'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/translations')
    .get(function(req, res) {
        controller.getTranslations({
            languageKey: req.query.languageKey,
            namespaces: req.query.namespaces
        }, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

module.exports = router;
