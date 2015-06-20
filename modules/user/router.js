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
        var data = {
            _id: req.body._id || null,
            firstName: req.body.firstName || 'Jan',
            lastName: req.body.lastName || 'Pan',
            department: req.body.department || 'D9',
            birthday: req.body.birthday || '01/01/1990',
            email: req.body.email || 'jan@gmail.com',
            skype: req.body.skype || 'jan90',
            dateOfEmploy: req.body.dateOfEmploy || '06/09/2010'
        };

        controller.addUser(data, function(err, user) {
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
        var _id = req.params.user,
            data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                department: req.body.department,
                birthday: req.body.birthday,
                email: req.body.emails,
                skype: req.body.skype,
                dateOfEmploy: req.body.dateOfEmploy
            };

        controller.updateUser(_id, data, function(err, user){
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

module.exports = router;
