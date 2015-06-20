'use strict';

function config($stateProvider) {
    $stateProvider
        .state('questionnaire', {
            url: '/questionnaire/:id',
            template: require('./questionnaire.html'),
            controller: 'QuestionnaireController'
        });
}

module.exports = config;