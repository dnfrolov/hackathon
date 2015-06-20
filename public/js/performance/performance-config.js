'use strict';

function config($stateProvider) {

    $stateProvider
        .state('performance', {
            url: '/performance',
            template: require('./performance.html'),
            controller: 'PerformanceController as vm'
        });
}

module.exports = config;