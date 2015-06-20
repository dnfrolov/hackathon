'use strict';

var mongoose = require('../../../libs/db');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    tags: [{
        _id: mongoose.Schema.ObjectId,
        name: String
    }]
});

module.exports = schema;
