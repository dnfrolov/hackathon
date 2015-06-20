'use strict';

var mongoose = require('mongoose'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    mongooseUtils = require('../../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['name', 'gridName', 'columns'],
        'search': ['name', 'gridName', 'columns']
    }
});

module.exports = mongoose.model('GridView', schema);