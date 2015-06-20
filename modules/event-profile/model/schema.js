'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    status: [Number],
    deleted: {
        type: Boolean,
        default: false
    },
    lastModified: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = schema;
