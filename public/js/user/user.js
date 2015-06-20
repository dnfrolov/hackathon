'use strict';

var angular = require('angular');

angular.module('User', [])
    .config(['$stateProvider', require('./user-config')])
    .controller('ProfileController', [
        '$scope',
        'user',
        'questions',
        'responses',
        require('./profile-controller')
    ])
    .controller('SaveUserController', [
        '$scope',
        '$state',
        'UserService',
        'user',
        require('./save-user-controller')
    ])
    .service('UserService', ['$q', '$http', 'UserModel', require('./user-service')])
    .factory('UserModel', function () {
        return require('./user-model');
    });