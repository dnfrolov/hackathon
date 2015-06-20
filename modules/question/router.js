'use strict';

var controller = require('./controller'),
    router = require('express').Router(),
    async = require('async'),
    TagController = require('../tag/controller');

router.route('/')
    .get(function(req, res) {
        controller.getQuestions({
            skip: req.query.skip || 0,
            limit: req.query.limit,
            sort: req.query.sort || null,
            query: req.query.query || null,
            filter: req.query.filter || {}
        }, function(err, data) {
            if (err) {
                return res.error(err);
            }

            return res.success(data);
        });
    })
    .post(function(req, res) {

        async.waterfall([
            function(callback) {
                TagController.getTags({
                    skip: req.query.skip || 0,
                    limit: req.query.limit,
                    query: req.query.query || null,
                    filter: {
                        _id: {$in: req.body.tags}
                    }
                }, callback);

            },
            function(tags, callback) {
                var data = {
                    name: req.body.name || 'Super question',
                    tags: tags.data
                };

                controller.addQuestion(data, callback);
            }
        ], function (err, result) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(result);
        });
    });

router.route('/:q')
    .get(function(req, res) {

        controller.getQuestion(req.params.q, function(err, q) {
            if (err) {
                return res.error(err);
            }

            return res.success(q);
        });
    })
    .put(function(req, res) {
        var _id = req.params.q;

        async.waterfall([
            function(callback) {
                TagController.getTags({
                    skip: req.query.skip || 0,
                    limit: req.query.limit,
                    query: req.query.query || null,
                    filter: {
                        _id: {$in: req.body.tags}
                    }
                }, callback);

            },
            function(tags, callback) {
                if(tags.data) {
                    req.body.tags = tags.data;
                }
                controller.updateQuestion(_id, req.body, callback);
            }
        ], function (err, result) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(result);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.q;

        controller.deleteQuestion(_id, function(err, q) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(q);
        });
    });

module.exports = router;
