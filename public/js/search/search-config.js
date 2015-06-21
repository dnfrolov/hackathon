'use strict';

function config($stateProvider) {
    $stateProvider
        .state('search', {
            url: '/search/:id',
            template: require('./search.html'),
            controller: 'SearchController',
            resolve: {
                users: ['UserService', function (UserService) {
                    return UserService.getAll();
                }]
            }
        });
}

module.exports = config;