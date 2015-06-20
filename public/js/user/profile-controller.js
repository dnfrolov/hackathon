'use strict';

var _ = require('lodash');

function ProfileController($scope, $state, user, questions, responses) {
    var getQuestionById = function (questionId) {
        return _.find(questions, function (question) {
            return question._id === questionId;
        });
    };

    $scope.responses = responses.map(function (response) {
        return _.assign(response, {questionName: getQuestionById(response.questionId).name});
    });

    $scope.user = user;

    $scope.edit = function () {
        $state.go('user.save', {id: $scope.user._id});
    };
}

module.exports = ProfileController;
