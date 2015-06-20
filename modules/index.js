'use strict';

exports.init = function(app) {
    app.use('/users', require('./user/router'));
};
