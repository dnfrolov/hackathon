'use strict';

var viewModel = require('./model/view'),
    filterModel = require('./model/filter');

exports.getViews = function (params, done) {
    params = params || {};

    viewModel.getList(params, done);
};

exports.addView = function (data, done) {
    viewModel.addItem(data, done);
};

exports.getView = function (args, done) {
    viewModel.getItem(args, done);
};

exports.updateView = function (viewId, data, done) {
    viewModel.updateItem(viewId, data, done);
};

exports.deleteView = function (viewId, done) {
    viewModel.deleteItem(viewId, done);
};

exports.getFilters = function (params, done) {
    params = params || {};

    filterModel.getList(params, done);
};

exports.addFilter = function (data, done) {
    filterModel.addItem(data, done);
};

exports.getFilter = function (args, done) {
    filterModel.getItem(args, done);
};

exports.updateFilter = function (viewId, data, done) {
    filterModel.updateItem(viewId, data, done);
};

exports.deleteFilter = function (viewId, done) {
    filterModel.deleteItem(viewId, done);
};