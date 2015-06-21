'use strict';

var angular = require('angular');

angular.module('Search', [])
    .config(['$stateProvider', require('./search-config')])
    .controller('SearchController', [
        '$scope',
        'UserService',
        'users',
        'questions',
        require('./search-controller')
    ]);