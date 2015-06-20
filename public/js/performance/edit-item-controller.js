'use strict';

var angular = require('angular');

function EditItemController($scope) {

    var vm = this;
    var item = $scope.ngDialogData.item;

    vm.item = angular.copy(item);

    vm.submit = function () {
        item.title = vm.item.title;
        item.resource = vm.item.resource;

        $scope.closeThisDialog();
    };
}

module.exports = EditItemController;