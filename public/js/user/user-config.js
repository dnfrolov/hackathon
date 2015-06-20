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
            controller: 'ProfileController'
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
        });
}

module.exports = config;