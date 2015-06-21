'use strict';

var _ = require('lodash');

function QuestionnaireController($scope, $state, UserService, questions, responses) {
    $scope.userId = $state.params.id;
    $scope.questions = questions;

    var getQuestionById = function (questionId) {
        return _.find($scope.questions, function (question) {
            return question._id === questionId;
        });
    };

    if (Array.isArray(responses) && responses.length) {
        $scope.responses = responses.map(function (response) {
            return _.assign(response, {questionName: getQuestionById(response.questionId).name});
        });
    } else {
        $scope.responses = $scope.questions.map(function (question) {
            return {
                questionId: question._id,
                questionName: question.name,
                tags: []
            };
        });
    }

    $scope.getTags = function ($query, questionId) {
        var question = getQuestionById(questionId);

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
