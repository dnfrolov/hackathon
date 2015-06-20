'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    title: {
        type: String
    },
    items: []
});

module.exports = schema;
