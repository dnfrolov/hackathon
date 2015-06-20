'use strict';

function config($stateProvider) {

    $stateProvider
        .state('performance', {
            url: '/performance/:id',
            template: require('./performance.html'),
            controller: 'PerformanceController as vm',
            resolve: {
                dictionary: ['PerformanceService', function (performanceService) {
                    return performanceService.getGoals();
                }],
                prs: ['PerformanceService', '$stateParams', function (performanceService, $stateParams) {
                    return performanceService.getPrs($stateParams.id);
                }]
            }
        });
}

module.exports = config;