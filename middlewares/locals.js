'use strict';

module.exports = function (req, res, next) {
    res.locals = {
        hackathon: {
            user: {
                username: 'admin'
            }
        }
    };

    return next();
};
