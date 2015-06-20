'use strict';

var express = require('express'),
    app = express(),
    passport = require('./modules/session/controller'),
    config = require('./config'),
    logger = require('./libs/log')(module),
    modules = require('./modules'),
    connectDomain = require('connect-domain');

require('./libs/db');
app.use(require('./libs/response'));
passport.initialize(app);
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('compression')());

modules.init(app);

module.exports = exports = app;

exports.start = function (done) {
    app.listen(config.server.port, function () {
        logger.info('Express server listening on port ' + config.server.port);
        done();
    });
};

exports.stop = function (done) {
    done();
};

app.use(connectDomain());
app.use(require('./middlewares/api-break-error'));
