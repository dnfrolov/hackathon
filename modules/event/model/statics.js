'use strict';

var util = require('../../../libs/util');

exports.getEvents = function (params, done) {
    var filter = {};

    if (params.query) {
        filter = util.prepareSearch(params.query, this);
    }

    if (params.filter) {
        filter = util.prepareFilter(params.filter, this);
    }

    if (params.folders) {
        filter.folder = { $in: params.folders };
    }
    delete params.folders;

    params.filter = filter;
    delete params.query;

    this.getList(params, done);
};

exports.getEvent = function (_id, fields, done) {
    var options = {
        args: {
            _id: _id
        },
        fields: fields
    };

    this.getItem(options, done);
};
