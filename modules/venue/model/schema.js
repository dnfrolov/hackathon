'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Venue name is required'
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: Number
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;
