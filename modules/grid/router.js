'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/views')
    .get(function(req, res) {
        controller.getViews({ limit: 0}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    })
    .post(function(req, res) {
        var data = {
            name: req.body.name,
            gridName: req.body.gridName,
            columns: req.body.columns
        };

        controller.addView(data, function(err, view) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(view);
        });
    });

router.route('/views/:id')
    .get(function(req, res) {
        controller.getView(req.params.id, function(err, view) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(view);
        });
    })
    .put(function(req, res) {
        var data = {
            name: req.body.name,
            gridName: req.body.gridName,
            columns: req.body.columns
        };

        controller.updateView(req.params.id, data, function(err, view) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(view);
        });
    })
    .delete(function(req, res) {
        controller.deleteView(req.params.id, function(err, view) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(view);
        });
    });

router.route('/filters')
    .get(function(req, res) {
        controller.getFilters({ limit: 0}, function(err, data) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    })
    .post(function(req, res) {
        var data = {
            name: req.body.name,
            gridName: req.body.gridName,
            columns: req.body.columns
        };

        controller.addFilter(data, function(err, filter) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(filter);
        });
    });

router.route('/filters/:id')
    .get(function(req, res) {
        controller.getFilter(req.params.id, function(err, filter) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(filter);
        });
    })
    .put(function(req, res) {
        var data = {
            name: req.body.name,
            gridName: req.body.gridName,
            columns: req.body.columns
        };

        controller.updateFilter(req.params.id, data, function(err, filter) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(filter);
        });
    })
    .delete(function(req, res) {
        controller.deleteFilter(req.params.id, function(err, filter) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(filter);
        });
    });

module.exports = router;
