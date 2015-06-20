'use strict';

var mongoose = require('../../../libs/db'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    _ = require('lodash'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['name', 'profile', 'folder', 'status', 'code', 'description',
            'timezone', 'startDateTime', 'endDateTime', 'registrationCloseDateTime'],
        'search': ['name', 'code', 'description']
    }
});

_.extend(schema.statics, require('./statics'));

module.exports = mongoose.model('Event', schema);
