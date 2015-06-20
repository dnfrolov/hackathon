'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getTags({
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
        if(!req.body.name) {
            return res.conflict({}, 'name is empty');
        }

        var data = {
            name: req.body.name
        };

        controller.addTag(data, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:tag')
    .get(function(req, res) {

        controller.getTag(req.params.tag, function(err, tag) {
            if (err) {
                return res.error(err);
            }

            return res.success(tag);
        });
    })
    .put(function(req, res) {
        var _id = req.params.tag;

        controller.updateTag(_id, req.body, function(err, tag){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(tag);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.tag;

        controller.deleteTag(_id, function(err, tag) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(tag);
        });
    });

module.exports = router;
