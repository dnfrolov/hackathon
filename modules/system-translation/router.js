'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getSystemTranslations({
            skip: req.query.skip,
            limit: req.query.limit,
            sort: req.query.sort,
            query: req.query.query
        }, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

router.route('/:id')
    .put(function(req, res) {
        var _id = req.params.id,
            data = {
                translations: req.body.translations,
                lastUpdated: new Date()
            };

        controller.updateSystemTranslation(_id, data, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    });

module.exports = router;
