'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getUsers({
            skip: req.query.skip || 0,
            limit: req.query.limit || 10,
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
        controller.addUser(req.body, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user')
    .get(function(req, res) {

        controller.getUser(req.params.user, function(err, user) {
            if (err) {
                return res.error(err);
            }

            return res.success(user);
        });
    })
    .put(function(req, res) {
        var _id = req.params.user;

        controller.updateUser(_id, req.body, function(err, user){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.user;

        controller.deleteUser(_id, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user/responses')
    .get(function(req, res) {

        controller.getUserResponses(req.params.user, function(err, user) {
            if (err) {
                return res.error(err);
            }

            return res.success(user);
        });
    })
    .put(function(req, res) {
        var _id = req.params.user;

        controller.updateUser(_id, { responses: req.body }, function(err, user){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user/prs')
    .get(function(req, res) {

        controller.getUserPrs(req.params.user, function(err, user) {
            if (err) {
                return res.error(err);
            }

            return res.success(user);
        });
    })
    .put(function(req, res) {
        var _id = req.params.user;

        controller.updateUser(_id, { prs: req.body.prs, skills: req.body.skills }, function(err, user){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user/searchByTags')
    .get(function(req, res) {
        if(!req.query.filter) {
            return res.conflict(null, 'pass filter');
        }

        controller.getUsers({
            filter: {'responses.tags._id': {$in: req.query.filter}}
        }, function(err, data) {
            if (err) {
                return res.error(err);
            }

            return res.success(data);
        });
    });

router.route('/:user/searchBySkills')
    .get(function(req, res) {
        if(!req.query.filter) {
            return res.conflict(null, 'pass filter');
        }

        controller.getUsers({
            filter: {'skills.title': {$in: req.query.filter}}
        }, function(err, data) {
            if (err) {
                return res.error(err);
            }

            return res.success(data);
        });
    });

module.exports = router;
