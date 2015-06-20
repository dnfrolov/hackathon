'use strict';

var angular = require('angular');

require('./profile/profile');
require('./questionnaire/questionnaire');

angular.element(document).ready(function () {
    angular
        .module('Hackathon', [
            'ui.router',
            'ui.bootstrap',
            'ui.tree',
            'Profile',
            'Questionnaire'
        ])
        .config(['$urlRouterProvider', require('./config')]);

    angular.bootstrap(document, ['Hackathon']);
});