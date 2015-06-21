'use strict';

var _ = require('lodash');

function UserStatsController(users) {
    var vm = this;

    var interests = [];
    _.forEach(users, function (user) {
        _.forEach(user.responses, function (response) {
            interests = interests.concat(response.tags);
        });
    });

    var grouped = _.groupBy(interests, function (interest) {
        return interest.name;
    });

    var data = [];
    for(var key in grouped) {
        data.push({
            category: key,
            column: key.length
        });
    }


    AmCharts.makeChart("chartdiv",
        {
            "type": "pie",
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "titleField": "category",
            "valueField": "column",
            "allLabels": [],
            "balloon": {},
            "legend": {
                "align": "center",
                "markerType": "circle"
            },
            "titles": [],
            "dataProvider": data
        }
    );

}

module.exports = UserStatsController;