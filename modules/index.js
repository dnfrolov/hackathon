'use strict';

exports.init = function(app) {
    app.use('/session', require('./session/router'));
    app.use('/accounts', require('./account/router'));
    app.use('/accountTypes', require('./accountType/router'));
    app.use('/userTypes', require('./userType/router'));
    app.use('/userRoles', require('./userRole/router'));
    app.use('/users', require('./user/router'));
    app.use('/zendeskUsers', require('./zendeskUser/router'));
    app.use('/system-translations', require('./system-translation/router'));
    app.use('/translations', require('./translation/router'));
    app.use('/events', require('./event/router'));
    app.use('/eventProfiles', require('./event-profile/router'));
    app.use('/eventStatuses', require('./eventStatus/router'));
    app.use('/folders', require('./folder/router'));
    app.use('/common', require('./common/router'));
    app.use('/venues', require('./venue/router'));
    app.use('/grid', require('./grid/router'));
};
