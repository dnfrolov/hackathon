'use strict';

function config($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            template: require('./profile.html'),
            controller: 'ProfileController'
        });
}

module.exports = config;