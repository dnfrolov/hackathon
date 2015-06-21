'use strict';

var _ = require('lodash');

var angular = require('angular');
var alertify = require('alertify');


function PerformanceController(ngDialog, $stateParams, performanceService, dictionary, prs) {
    var vm = this;
    prs = prs && prs.length || [{
        "title": "Performance Review - Sep 2014",
        "type": "pr",
        "status": "active",
        "items": []
    }];
    vm.groups = dictionary.concat(prs);
    vm.activePR = _.find(vm.groups, {type: 'pr', status: 'active'});


    vm.removeItem = function (group, item) {
        var index = group.items.indexOf(item);
        if (index > -1) {
            group.items.splice(index, 1);
        }
    };

    vm.addItem = function (group) {
        group.items.push({
            title: group.newItemTitle
        });
        group.newItemTitle = '';
    };

    vm.addItemToActivePR = function (group, item) {
        var $item = angular.copy(item);
        $item.title = group.title + ' - ' + item.title;

        var index = _.find(vm.activePR.items, {title: $item.title});
        if (!index) {
            vm.activePR.items.push($item);
        }
    };

    vm.completeActivePR = function () {
        vm.activePR.status = 'completed';
        var active = {
            title: 'Performance Review',
            type: 'pr',
            status: 'active',
            items: []
        };
        vm.groups.push(active);
        vm.activePR = active;
    };

    vm.addGroup = function () {
        vm.groups.push({
            title: vm.newGroupTitle,
            type: 'dictionary',
            items: []
        });
        vm.newGroupTitle = '';
    };

    vm.toggle = function (scope) {
        scope.toggle();
    };

    vm.completeItem = function (item) {
        item.status = 'succeeded';
    };

    vm.editItem = function (item) {
        ngDialog.open({
            template: require('./edit-item.html'),
            plain: true,
            className: 'ngdialog-theme-default item-dialog',
            controller: 'EditItemController as vm',
            data: {
                item: item
            }
        });
    };

    vm.viewItem = function (item) {
        ngDialog.open({
            template: require('./view-item.html'),
            plain: true,
            className: 'ngdialog-theme-default item-dialog',
            controller: 'ViewItemController as vm',
            data: {
                item: item
            }
        });
    };

    vm.save = function () {
        var prs = _.filter(vm.groups, {type: 'pr'});
        var goals = _.filter(vm.groups, {type: 'dictionary'});

        var skills = [];

        _.forEach(prs, function (pr) {
            var items = _.filter(pr.items, {status: 'succeeded'});
            _.forEach(items, function (item) {
                skills.push({
                    title: item.title,
                    level: item.level
                });
            });
        });

        performanceService.updateUser($stateParams.id, prs, goals, skills);
    };
}

module.exports = PerformanceController;
