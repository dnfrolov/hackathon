'use strict';

var angular = require('angular');

require('./user/user');
require('./questionnaire/questionnaire');
require('./performance/index');

angular.element(document).ready(function () {
    angular
        .module('Hackathon', [
            'ui.router',
            'ui.bootstrap',
            'ui.tree',
            'Questionnaire',
            'Performance',
            'User'
        ])
        .config(['$urlRouterProvider', require('./config')]);

    angular.bootstrap(document, ['Hackathon']);
});