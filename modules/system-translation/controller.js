'use strict';

var model = require('./model'),
    _ = require('lodash');

exports.getSystemTranslations = function(params, done) {
    params = params || {};

    var options = {
            skip: params.skip || 0,
            limit: params.limit || 10,
            sort: params.sort || null,
            query: params.query || null,
            fields: model.getReadFilterKeys('public')
        };

    model.getTranslations(options, done);
};

exports.updateSystemTranslation = function(id, data, done) {
    model.updateTranslation(id, data, function(err, translation) {
        done(err, translation);
    });
};

exports.getTranslations = function(params, done) {
    var languageKey = params.languageKey,
        namespaces = params.namespaces;

    model.find({namespace: {$in: namespaces}}, function(err, data) {
        var translations = {},
            key,
            i;

        if (data) {
            for (i = 0; i < data.length; i++) {
                key = data[i].key;

                if (_.has(data[i].translations, languageKey) && data[i].translations[languageKey].length !== 0) {
                    translations[key] = data[i].translations[languageKey];
                } else {
                    translations[key] = data[i].originalLabel;
                }
            }
        }

        done(null, translations);
    });
};

