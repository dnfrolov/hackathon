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
                }],
                responses: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.getResponses($stateParams.userId);
                }]
            }
        });
}

module.exports = config;