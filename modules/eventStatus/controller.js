'use strict';

exports.getEventStatuses = function(params, done) {
    var eventStatuses = [
        {
            _id: 1,
            name: 'Design'
        },
        {
            _id: 2,
            name: 'Open Registration'
        },
        {
            _id: 3,
            name: 'Live On-Site'
        },
        {
            _id: 4,
            name: 'Post-Event'
        },
        {
            _id: 5,
            name: 'Closed'
        },
        {
            _id: 6,
            name: 'Canceled'
        }
    ];

    done(null, {
        data: eventStatuses,
        count: eventStatuses.length
    });
};
