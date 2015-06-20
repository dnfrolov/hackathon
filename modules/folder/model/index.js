'use strict';

var mongoose = require('../../../libs/db'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['name', 'parentFolder', 'accessLevel'],
        'search': ['name', 'parentFolder', 'accessLevel']
    }
});

module.exports = mongoose.model('Folder', schema);
