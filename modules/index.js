'use strict';

exports.init = function(app) {
    app.use('/users', require('./user/router'));
    app.use('/tags', require('./tag/router'));
    app.use('/q', require('./question/router'));
    app.use('/goals', require('./goals/router'));
};
