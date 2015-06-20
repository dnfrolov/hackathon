'use strict';

var angular = require('angular');

angular.module('Performance', ['ui.tree', 'ngDialog'])
    .config(['$stateProvider', require('./performance-config')])
    .controller('PerformanceController', ['ngDialog', '$stateParams', 'PerformanceService', 'dictionary', 'prs', require('./performance-controller')])
    .controller('EditItemController', ['$scope', require('./edit-item-controller')])
    .controller('ViewItemController', ['$scope', require('./view-item-controller')])
    .service('PerformanceService', ['$http', require('./performance-service')]);