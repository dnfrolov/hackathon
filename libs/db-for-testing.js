'use strict';

var mongoose = require('mongoose'),
    config = require('../config');

config.mongodb.db = 'testing';

require('./db');

module.exports = mongoose;
