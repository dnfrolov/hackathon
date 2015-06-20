'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    parentFolder: {
        type: mongoose.Schema.ObjectId,
        ref: 'Folder'
    },
    accessLevel: {
        type: Number
    },
    deleted: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = schema;
