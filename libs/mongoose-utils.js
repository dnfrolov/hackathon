'use strict';

var _ = require('lodash'),
    util = require('./util'),
    async = require('async');

module.exports = exports = function (schema) {

    schema.statics.getItem = function (options, done) {
        // Default expected options
        _.defaults(options, {
            args: null,
            fields: null
        });

        var filter = {};

        if (typeof options.args === 'object') {
            _.extend(filter, options.args);
        } else {
            filter._id = options.args;
        }

        if (typeof options.fields === 'string') {
            options.fields = options.fields || {};

            if (options.populate) {
                this.findOne(filter, options.fields).populate(options.populate).exec(done);
            } else {
                this.findOne(filter, options.fields, done);
            }
        } else {
            if (options.populate) {
                this.findOne(filter).populate(options.populate).exec(done);
            } else {
                this.findOne(filter, done);
            }
        }
    };

    schema.statics.addItem = function (data, done) {
        var Model = this,
            item = new Model(data);

        item.save(done);
    };

    schema.statics.addItems = function (data, done) {
        if(Array.isArray(data)) {
            var Model = this;

            return async.each(data, function (item, callback) {
                if(item._id) {
                    return Model.findByIdAndUpdate(item._id, item, { new: true }, callback);
                }
                var newModel = new Model(item);
                newModel.save(callback);
            }, done);

        }

        return done();
    };

    schema.statics.updateItem = function (_id, data, done) {
        this.findByIdAndUpdate(_id, data, { new: true }, done);
    };

    schema.statics.deleteItem = function (_id, done) {
        this.getItem({args: _id}, function (err, item) {
            if (!item) {
                return done();
            }

            item.remove(done);
        });
    };

    schema.statics.getList = function (options, done) {
        var Model = this,
            filter,
            query;

        // Default expected options
        _.defaults(options, {
            filter: {},
            fields: null,
            population: null,
            sort: null,
            skip: 0,
            limit: 0
        });

        if (options.query) {
            filter = util.prepareSearch(options.query, this);
            _.assign(options.filter, filter);
        }

        query = Model.find(options.filter)
            .skip(+options.skip)
            .limit(+options.limit)
            .sort(options.sort);

        if (options.fields) {
            query = query.select(options.fields);
        }

        if (options.population) {
            query = query.populate(options.population);
        }

        async.parallel({
            count: function (next) {
                Model.count(options.filter, next);
            },
            data: function (next) {
                query.exec(next);
            }
        }, done);
    };
};
