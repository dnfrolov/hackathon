'use strict';

function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/profile');
}

module.exports = config;