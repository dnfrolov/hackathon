'use strict';

function config($stateProvider) {
    $stateProvider
        .state('questionnaire', {
            url: '/questionnaire/:userId',
            template: require('./questionnaire.html'),
            controller: 'QuestionnaireController',
            resolve: {
                questions: ['QuestionService', function (QuestionService) {
                    return QuestionService.getList();
                }]
            }
        });
}

module.exports = config;