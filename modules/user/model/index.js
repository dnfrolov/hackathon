'use strict';

var mongoose = require('mongoose'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    _ = require('lodash'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['firstName', 'lastName', 'department', 'birthday', 'email',
            'skype', 'dateOfEmploy'],
        'search': ['firstName', 'lastName', 'department', 'birthday', 'email',
            'skype', 'dateOfEmploy']
    }
});

_.extend(schema.methods, require('./methods'));
_.extend(schema.statics, require('./statics'));

module.exports = mongoose.model('User', schema);
