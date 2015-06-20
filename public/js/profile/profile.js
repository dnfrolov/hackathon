'use strict';

var angular = require('angular');

angular.module('Profile', [])
    .config(['$stateProvider', require('./profile-config')])
    .controller('ProfileController', ['$scope', require('./profile-controller')]);