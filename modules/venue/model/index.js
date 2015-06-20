'use strict';

var mongoose = require('../../../libs/db'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['name', 'address1', 'address2', 'city', 'postalCode', 'state', 'country', 'deleted'],
        'search': ['name', 'address1', 'address2', 'city', 'postalCode', 'state', 'country'],
        'location': ['address1', 'address2', 'city', 'postalCode', 'state']
    }
});

module.exports = mongoose.model('Venue', schema);