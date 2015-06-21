'use strict';

var alertify = require('alertify');

function config($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            abstract: true,
            template: require('./user.html')
        })
        .state('user.profile', {
            url: '/profile/:id',
            template: require('./profile.html'),
            controller: 'ProfileController',
            resolve: {
                user: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.get($stateParams.id);
                }],
                questions: ['QuestionService', function (QuestionService) {
                    return QuestionService.getList();
                }],
                responses: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.getResponses($stateParams.id);
                }]
            }
        })
        .state('user.save', {
            url: '/save/:id',
            template: require('./save.html'),
            controller: 'SaveUserController',
            resolve: {
                user: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.get($stateParams.id);
                }]
            }
        })
        .state('stats', {
            url: '/stats/:id',
            template: require('./stats.html'),
            controller: 'UserStatsController as vm',
            resolve: {
                users: ['UserService', function (UserService) {
                    return UserService.getList();
                }]
            }
        });
}

module.exports = config;