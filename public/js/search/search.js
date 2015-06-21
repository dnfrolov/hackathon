'use strict';

var angular = require('angular');

angular.module('Search', [])
    .config(['$stateProvider', require('./search-config')])
    .controller('SearchController', [
        '$scope',
        'UserService',
        'users',
        require('./search-controller')
    ]);
