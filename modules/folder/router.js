'use strict';

var controller = require('./controller'),
    router = require('express').Router();

router.route('/')
    .get(function(req, res) {
        controller.getFolders({
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
            name: req.body.name,
            parentFolder: req.body.parentFolder._id
        };

        controller.addFolder(data, function(err, folder) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(folder);
        });
    });

router.route('/:folder')
    .get(function(req, res) {
        controller.getFolder(req.params.folder, function(err, folder) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(folder);
        });
    })
    .put(function(req, res) {
        var _id = req.params.folder,
            data = {
                name: req.body.name,
                parentFolder: req.body.parentFolder._id
            };

        controller.updateFolder(_id, data, function(err, folder) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(folder);
        });
    })
    .delete(function(req, res) {
        var _id = req.params.folder;

        controller.deleteFolder(_id, function(err, folder) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(folder);
        });
    });

module.exports = router;
