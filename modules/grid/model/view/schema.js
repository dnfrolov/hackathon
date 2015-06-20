'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    gridName: {
        type: String,
        required: 'Grid name is required'
    },
    columns: {
        type: [],
        required: 'Columns is required'
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;
