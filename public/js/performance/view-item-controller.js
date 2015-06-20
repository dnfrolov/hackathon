'use strict';

function ViewItemController($scope) {
    var vm = this;
    vm.item = $scope.ngDialogData.item;
}

module.exports = ViewItemController;