'use strict';

var _ = require('lodash');

function User(data) {
    if (!_.isPlainObject(data)) {
        data = {};
    }

    _.assign(this, data);

    this.isAdmin = this.isAdmin || false;
    this.birthday = this.birthday ? new Date(data.birthday) : null;
    this.dateOfEmployment = this.dateOfEmployment ? new Date(data.dateOfEmployment) : null;
}

module.exports = User;