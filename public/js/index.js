'use strict';

var angular = require('angular');

require('./user/user');
require('./search/search');
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
            'User',
            'Search'
        ])
        .config(['$urlRouterProvider', require('./config')])
        .run(['$rootScope', '$state', require('./run')]);

    angular.bootstrap(document, ['Hackathon']);
});