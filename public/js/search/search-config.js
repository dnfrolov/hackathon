'use strict';

function config($stateProvider) {
    $stateProvider
        .state('search', {
            url: '/search/:id',
            template: require('./search.html'),
            controller: 'SearchController',
            resolve: {
                users: ['UserService', function (UserService) {
                    return UserService.getList();
                }],
                questions: ['QuestionService', function (QuestionService) {
                    return QuestionService.getList();
                }]
            }
        });
}

module.exports = config;