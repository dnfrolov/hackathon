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
                return res.error('something went wrong');
            }

            return res.success(data);
        });
    })
    .post(function(req, res) {
        var data = {
            _id: req.body._id || null,
            username: req.body.username,
            password: '',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            title: req.body.title,
            primaryEmail: req.body.primaryEmail,
            emails: req.body.emails,
            phones: req.body.phones,
            zendeskUser: req.body.zendeskUser,
            accounts: req.body.accounts,
            userType: req.body.userType,
            lastLoginBrowser: req.body.lastLoginBrowser || null,
            lastLoginOperatingSystem: req.body.lastLoginOperatingSystem || null,
            lastLoginTime: req.body.lastLoginTime || null,
            isConfirmed: false,
            deleted: false,
            enabled: true,
            preferences: {}
        };

        controller.addUser(data, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }


            return res.success(user);
        });
    });

router.route('/getcode')
    .get(function(req, res) {
        var username = req.query.username;
        controller.getCode(username, function(err) {
            if (err) {
                return res.badRequest('something went wrong');
            }

            return res.success({});
        });
    });

router.route('/confirmcode')
    .post(function(req, res) {

        controller.checkConfirmationCode(req.body.confirmationCode, function(err, userId) {
            if (err) {
                return res.badRequest('something went wrong');
            }

            if (!userId) {
                return res.badRequest('something went wrong');
            }

            return res.success({});

        });
    });

router.route('/resetpassword')
    .post(function(req, res) {
        var confirmationCode = req.body.confirmCode,
            newPassword = req.body.newPassword;

        if (!confirmationCode) {
            return res.badRequest('something went wrong');
        }
        controller.resetPassword(confirmationCode, newPassword, function(err) {
            if (err) {
                return res.badRequest('something went wrong');
            }

            return res.success({});
        });
    });


router.route('/:user')
    .get(function(req, res) {

        controller.getUser(req.params.user, function(err, user) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(user);
        });
    })
    .put(function(req, res) {
        var _id = req.params.user,
            data = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                title: req.body.title,
                primaryEmail: req.body.primaryEmail,
                emails: req.body.emails,
                phones: req.body.phones,
                zendeskUser: req.body.zendeskUser,
                accounts: req.body.accounts,
                userType: req.body.userType,
                primaryAccount: req.body.primaryAccount,
                enabled: !! req.body.enabled
            };

        controller.updateGridUser(_id, data, function(err, user){
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
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
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user/preferences')
    .put(function(req, res) {
        var _id = req.params.user,
            data = {
                preferences: req.body
            };

        controller.updateUser(_id, data, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

router.route('/:user/lastlogin')
    .put(function(req, res) {
        var _id = req.params.user,
            data = {
                lastLoginTime: req.body.lastLoginTime,
                lastLoginBrowser: req.body.lastLoginBrowser,
                lastLoginOperatingSystem: req.body.lastLoginOperatingSystem
            };

        controller.updateUser(_id, data, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });


router.route('/valid/:username')
    .get(function(req, res) {

        controller.getUserByName(req.params.username, function(err, user) {
            if (err) {
                if (err.name !== 'ValidationError') {
                    return res.error('something went wrong');
                }

                return res.conflict(err, 'something went wrong');
            }

            return res.success(user);
        });
    });

module.exports = router;
