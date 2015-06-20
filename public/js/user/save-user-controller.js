'use strict';

function SaveUserController($scope, $state, UserService, user) {
    $scope.user = user;

    $scope.openDatepicker = function ($event, isBirthdayDatepicker) {
        $event.preventDefault();
        $event.stopPropagation();

        if (isBirthdayDatepicker) {
            $scope.isBirthdayDatepickerOpened = true;
        } else {
            $scope.isEmploymentDatepickerOpened = true;
        }
    };

    $scope.save = function () {
        if ($scope.userForm.$invalid) {
            return;
        }

        UserService.save($scope.user).then(function () {
            $state.go('questionnaire', {id: $scope.user._id});
        });
    };
}

module.exports = SaveUserController;
