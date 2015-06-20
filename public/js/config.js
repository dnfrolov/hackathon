'use strict';

function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/user/save/');
}

module.exports = config;