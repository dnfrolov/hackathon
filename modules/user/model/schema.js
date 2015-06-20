'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    department: {
        type: String
    },
    birthday: {
        type: String
    },
    email: {
        type: String
    },
    skype: {
        type: String
    },
    dateOfEmployment: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;
