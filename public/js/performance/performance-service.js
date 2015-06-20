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

    this.getPrs = function (userId) {
        return $http.get('/users/' + userId + '/prs').then(function (response) {
            var prs = response.data.data.prs;
            _.forEach(prs, function (item) {
                item.type = 'pr';
            });
            return prs;
        });
    };

    this.updateUser = function (userId, prs, goals, skills) {
        return $http.put('/users/' + userId + '/prs', {prs: prs, skills: skills}).then(function () {
            return $http.post('/goals/multi', goals);
        }).then(function () {
            alertify.alert('Changes has been Updated');
        }).catch(function(){
            alertify.alert('Something Went Wrong. Please Try Later');
        });
    };
}

module.exports = PerformanceService;