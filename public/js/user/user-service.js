'use strict';

var _ = require('lodash');
var alertify = require('alertify');

function UserService($q, $http, UserModel) {
    var baseUrl = '/users/';

    this.getAll = function () {
        var self = this;
        return $http.get(baseUrl).then(function (response) {
            var users = [];
            _.forEach(response.data.data.data, function (user){
                users.push(self.create(user));
            });

            return users;

        });
    };

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
                return response.data.data.responses;
            },
            function () {
                alertify.error('Something went wrong');
            });
    };
}

module.exports = UserService;