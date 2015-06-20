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
    currentPosition: {
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
    mobile: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    },
    room: {
        type: String
    },
    dateOfEmployment: {
        type: Date,
        default: Date.now
    },
    university: {
        type: String
    },
    faculty: {
        type: String
    },
    major: {
        type: String
    },
    graduationYear: {
        type: String
    },
    additionalCourses: {
        type: String
    },
    expPosition: {
        type: String
    },
    expYears: {
        type: String
    },
    summary: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;
