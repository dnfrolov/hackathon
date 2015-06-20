'use strict';

function config($stateProvider) {
    $stateProvider
        .state('questionnaire', {
            url: '/questionnaire/:id',
            template: require('./questionnaire.html'),
            controller: 'QuestionnaireController',
            resolve: {
                questions: ['QuestionService', function (QuestionService) {
                    return QuestionService.getList();
                }],
                responses: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.getResponses($stateParams.id);
                }]
            }
        });
}

module.exports = config;