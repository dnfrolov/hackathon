'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    namespace: {
        type: String,
        required: 'Namespace is required'
    },
    pageName: {
        type: String,
        required: 'Page name is required'
    },
    key: {
        type: String
    },
    originalLabel: {
        type: String
    },
    translations: {
        type: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;
