'use strict';

var systemTranslationModel = require('./../system-translation/model'),
    _ = require('lodash');

exports.getTranslations = function(params, done) {
    var languageKey = params.languageKey,
        namespaces = params.namespaces;

    systemTranslationModel.find({namespace: {$in: namespaces}}, function(err, data) {
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



