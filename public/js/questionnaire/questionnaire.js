'use strict';

var angular = require('angular');

angular.module('Questionnaire', ['ngTagsInput'])
    .config(['$stateProvider', require('./questionnaire-config')])
    .controller('QuestionnaireController', ['$scope', require('./questionnaire-controller')]);