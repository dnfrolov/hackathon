'use strict';

var mongoose = require('mongoose'),
    validator = require('validator');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Account name is required',
        validate: [

            function (val) {
                return validator.isLength(val, 1);
            },
            'Account name must be at least 1 character long.'
        ]
    },

    accountType: {
        type: {},
        required: 'Account type is required'
    },

    enabled: {
        type: Boolean
    },

    deleted: {
        type: Boolean,
        default: false,
        select: false
    },

    primaryAdmin: {
        type: Number
    }
}, {
    versionKey: false
});

module.exports = schema;
