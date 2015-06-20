'use strict';

function config($stateProvider) {
    $stateProvider
        .state('questionnaire', {
            url: '/questionnaire',
            template: require('./questionnaire.html'),
            controller: 'QuestionnaireController'
        });
}

module.exports = config;