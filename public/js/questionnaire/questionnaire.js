'use strict';

var angular = require('angular');

angular.module('Questionnaire', [])
    .config(['$stateProvider', require('./questionnaire-config')])
    .controller('QuestionnaireController', ['$scope', require('./questionnaire-controller')]);