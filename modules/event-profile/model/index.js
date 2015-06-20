'use strict';

var mongoose = require('../../../libs/db'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['name', 'status', 'lastModified'],
        'search': ['name', 'status']
    }
});

module.exports = mongoose.model('EventProfile', schema);
