'use strict';

var util = require('../../../libs/util');

exports.addTranslation = function (data, done) {
    var Translation = this,
        translation = new Translation(data);

    translation.save(function (err) {
        return done(err, translation);
    });
};

exports.updateTranslation = function (id, data, done) {
    this.findByIdAndUpdate(id, data, done);
};

exports.updateTranslationModel = function (translation, done) {
    translation.save(function (err) {
        return done(err, translation);
    });
};

exports.deleteTranslationModel = function (translation, done) {
    translation.remove(function (err) {
        return done(err, translation);
    });
};

exports.getTranslations = function (params, done) {
    var filter = {};

    if (params.query) {
        filter = util.prepareSearch(params.query, this);
    }
    params.filter = filter;
    delete params.query;

    this.getList(params, done);
};
