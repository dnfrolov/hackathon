'use strict';

var angular = require('angular');

require('./profile/profile');

angular.element(document).ready(function () {
    angular
        .module('Hackathon', [
            'ui.router',
            'ui.bootstrap',
            'ui.tree',
            'Profile'
        ])
        .config(['$urlRouterProvider', require('./config')]);

    angular.bootstrap(document, ['Hackathon']);
});