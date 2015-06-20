'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getAccounts({
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
            _id: req.body._id || null,
            name: req.body.name,
            accountType: req.body.accountType,
            enabled: req.body.enabled
        };

        controller.addAccount(data, function(err, account) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(account);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        controller.getAccount(req.params.id, function(err, account) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(account);
        });
    })
    .put(function(req, res) {
        var data = {
            name: req.body.name,
            accountType: req.body.accountType,
            enabled: req.body.enabled
        };

        controller.updateAccount(req.params.id, data, function(err, account) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(account);
        });
    })
    .delete(function(req, res) {
        controller.deleteAccount(req.params.id, function(err, account) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(account);
        });
    });

module.exports = router;
