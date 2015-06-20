'use strict';

var angular = require('angular');

angular.module('Questionnaire', ['ngTagsInput'])
    .config(['$stateProvider', require('./questionnaire-config')])
    .controller('QuestionnaireController', ['$scope', '$state', 'UserService', 'questions', require('./questionnaire-controller')])
    .service('QuestionService', ['$http', require('./question-service')]);