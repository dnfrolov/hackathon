'use strict';

function SearchController($scope, UserService, users) {
    $scope.usersByTags = users;
    $scope.usersBySkills = users;
}

module.exports = SearchController;