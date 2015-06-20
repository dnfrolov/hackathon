'use strict';

function QuestionService($http) {
    this.getList = function () {
        return $http.get('/q').then(
            function (response) {
                return response.data.data.data;
            },
            function () {
                alertify.error('Something went wrong');
            });
    };
}

module.exports = QuestionService;