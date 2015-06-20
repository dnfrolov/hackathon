'use strict';

var alertify = require('alertify');

function UserService($q, $http, UserModel) {
    var baseUrl = 'http://localhost:3000/users/';

    this.create = function (data) {
        return new UserModel(data);
    };

    this.get = function (id) {
        var self = this;

        if (id) {
            return $http.get(baseUrl + id).then(
                function (response) {
                    return self.create(response.data.data);
                },
                function () {
                    alertify.error('Something went wrong');
                });
        } else {
            return $q.when(this.create());
        }
    };

    this.save = function (user) {
        var request = {
            method: user._id ? 'PUT' : 'POST',
            url: baseUrl + (user._id ? user._id : ''),
            data: user
        };

        return $http(request).then(
            function (response) {
                user._id = response.data.data._id;
            },
            function () {
                alertify.error('Something went wrong');
            });
    };

    this.saveResponses = function (userId, responses) {
        return $http.put(baseUrl + userId + '/responses', responses).catch(function () {
            alertify.error('Something went wrong');
        });
    };

    this.getResponses = function (userId) {
        return $http.get(baseUrl + userId + '/responses').then(
            function (response) {
                return response.data.responses;
            },
            function () {
                alertify.error('Something went wrong');
            });
    };
}

module.exports = UserService;