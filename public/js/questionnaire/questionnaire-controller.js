'use strict';

var _ = require('lodash');

function QuestionnaireController($scope, $state, UserService, questions) {
    $scope.userId = $state.params.userId;
    $scope.questions = questions;

    $scope.responses = $scope.questions.map(function (question) {
        return {
            questionId: question._id,
            questionName: question.name,
            tags: []
        };
    });

    $scope.getTags = function ($query, questionId) {
        var question = _.find($scope.questions, function (question) {
            return question._id === questionId;
        });

        if (!question) {
            return [];
        }

        return question.tags.filter(function (tag) {
            return tag.name.indexOf($query) !== -1;
        });
    };

    $scope.save = function () {
        if ($scope.questionnaireForm.$invalid) {
            return;
        }

        UserService.saveResponses($scope.userId, $scope.responses).then(function () {
            $state.go('user.profile', {id: $scope.userId});
        });
    };
}

module.exports = QuestionnaireController;
