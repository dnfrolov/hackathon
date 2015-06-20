'use strict';

function QuestionService($http) {
    var baseUrl = 'http://localhost:3000/q';

    this.getList = function () {
        return $http.get(baseUrl).then(
            function (response) {
                return response.data.data.data;
            },
            function () {
                alertify.error('Something went wrong');
            });
    };
}

module.exports = QuestionService;