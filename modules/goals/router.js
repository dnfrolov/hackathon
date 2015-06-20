'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getGoals({
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
        var data = {
            title: req.body.title,
            items: req.body.items || []
        };

        controller.addGoal(data, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/multi')
    .post(function(req, res) {
        if(!Array.isArray(req.body)) {
            return res.conflict(null, 'need array');
        }

        controller.addGoals(req.body, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:goal')
    .get(function(req, res) {

        controller.getGoal(req.params.goal, function(err, user) {
            if (err) {
                return res.error(err);
            }

            return res.success(user);
        });
    })
    .put(function(req, res) {
        var _id = req.params.goal;

        controller.updateGoal(_id, req.body, function(err, goal){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(goal);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.goal;

        controller.deleteGoal(_id, function(err, goal) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error(err);
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(goal);
        });
    });


module.exports = router;
