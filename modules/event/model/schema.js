'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    code: {
        type: String
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'EventProfile',
        required: 'Event profile is required'
    },
    folder: {
        type: mongoose.Schema.ObjectId,
        ref: 'Folder',
        required: 'Folder is required'
    },
    status: {
        type: Number
    },
    description: {
        type: String
    },
    timezone: {
        type: Number
    },
    startDateTime: {
        type: Date
    },
    endDateTime: {
        type: Date
    },
    registrationCloseDateTime: {
        type: Date
    },
    settings: {
        type: {}
    },
    venues: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Venue'
    }],
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
