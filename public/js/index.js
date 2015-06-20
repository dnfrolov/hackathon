'use strict';

var angular = require('angular');

require('./user/user');
require('./questionnaire/questionnaire');

angular.element(document).ready(function () {
    angular
        .module('Hackathon', [
            'ui.router',
            'ui.bootstrap',
            'ui.tree',
            'User',
            'Questionnaire'
        ])
        .config(['$urlRouterProvider', require('./config')]);

    angular.bootstrap(document, ['Hackathon']);
});