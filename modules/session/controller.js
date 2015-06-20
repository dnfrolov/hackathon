'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    UserController = require('../user/controller');

exports.initialize = function (app) {
    passport.use(new BasicStrategy(function (username, password, done) {
        UserController.getUserForAuth({
            username: username
        }, function (err, user) {

            if (err) {
                return done(err);
            }


            if (!user || !user.checkPassword(password) || !user.isConfirmed ||
                user.userType._id !== 1) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));

    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        return done(null, user);
    });

    app.use(passport.initialize());

    app.use(function (req, res, next) {
        passport.authenticate('basic', {
            session: false
        }, function (err, user) {
            var ignore = [
                '/users/getcode',
                '/users/confirmcode',
                '/users/resetpassword'
            ];

            if (ignore.indexOf(req.path) >= 0) {
                return next();
            }

            if (err) {
                return next(err);
            }

            if (!user) {
                return res.unauthorized('Unauthorized');
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return next();
            });
        })(req, res, next);
    });
};
