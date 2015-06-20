'use strict';

var _ = require('lodash');

function PerformanceService ($http) {
    this.getGoals = function () {
        return $http.get('/goals').then(function (response) {
            var groups = response.data.data.data;
            _.forEach(groups, function (item) {
                item.type = 'dictionary';
            });
            return groups;
        });
    };
    this.updateGoals = function (goals) {
        return $http.post('/goals', goals);
    };

    this.getPrs = function (userId) {
        return $http.get('/users/' + userId + '/prs').then(function (response) {
            var prs = response.data.data.prs;
            _.forEach(prs, function (item) {
                item.type = 'pr';
            });
            return prs;
        });
    };

    this.updatePrs = function (userId, prs) {
        return $http.put('/users/' + userId + '/prs', prs);
    };
}

module.exports = PerformanceService;