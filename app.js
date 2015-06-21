'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    config = require('./config'),
    logger = require('./libs/log')(module),
    staticPath = path.join(__dirname, 'public'),
    modules = require('./modules'),
    bodyParser = require('body-parser');

var favicon = require('serve-favicon');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require('cookie-parser')(config.server.cookieSecret));
app.use(express.static(staticPath));

require('./libs/db');
app.use(require('./libs/response'));
app.use(require('method-override')());
app.use(require('compression')());

app.use(require('./middlewares/locals'));
modules.init(app);
app.use(require('./middlewares/errors'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

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
