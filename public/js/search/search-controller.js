'use strict';

var _ = require('lodash');

function SearchController($scope, UserService, users, questions) {
    $scope.usersByTags = users;
    $scope.usersBySkills = users;
    $scope.tags = _.flatten(_.pluck(questions, 'tags'));
    $scope.tagsToSearch = [];

    $scope.getTags = function ($query) {
        return $scope.tags.filter(function (tag) {
            return tag.name.indexOf($query) !== -1;
        });
    };

    $scope.searchByTags = function () {
        UserService.searchByTags(_.pluck($scope.tagsToSearch, '_id')).then(function (users) {
            $scope.usersByTags = users;
        });
    };
}

module.exports = SearchController;