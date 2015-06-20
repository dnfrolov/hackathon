'use strict';

var _ = require('lodash');

//var groups = require('./groups');
var angular = require('angular');


function PerformanceController(ngDialog, performanceService, dictionary, prs) {
    var vm = this;
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

    };
}

module.exports = PerformanceController;
