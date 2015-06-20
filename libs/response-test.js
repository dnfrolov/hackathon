'use strict';

require('should');

var sinon = require('sinon'),
    response = require('./response'),
    res = {
        send: function() {}
    };


describe('Response Lib', function() {
    beforeEach(function() {
        sinon.stub(res, 'send', function(response) {
            return response;
        });
        response(null, res, function() {});
    });

    afterEach(function() {
        res.send.restore();
    });

    describe('Success', function() {
        it('should respond with a proper success object', function() {
            var data = {
                test: true
            }, response = res.success(data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('data');
            response.status.should.equal(200);
            response.data.should.equal(data);
        });
    });

    describe('Bad Request', function() {
        it('should respond with a proper bad request object (no data)', function() {
            var message = 'bad request',
                response = res.badRequest(message);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.status.should.equal(400);
            response.message.should.equal(message);
        });

        it('should respond with a proper bad request object (with data)', function() {
            var message = 'bad request',
                data = {
                    errors: [message]
                },
                response = res.badRequest(message, data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.should.have.property('data');
            response.status.should.equal(400);
            response.message.should.equal(message);
            response.data.should.equal(data);
        });
    });

    describe('Unauthorized', function() {
        it('should respond with a proper unauthorized object (no data)', function() {
            var message = 'unauthorized',
                response = res.unauthorized(message);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.status.should.equal(401);
            response.message.should.equal(message);
        });

        it('should respond with a proper unauthorized object (with data)', function() {
            var message = 'unauthorized',
                data = {
                    errors: [message]
                },
                response = res.unauthorized(message, data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.should.have.property('data');
            response.status.should.equal(401);
            response.message.should.equal(message);
            response.data.should.equal(data);
        });
    });

    describe('Forbidden', function() {
        it('should respond with a proper forbidden object (no data)', function() {
            var message = 'forbidden',
                response = res.forbidden(message);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.status.should.equal(403);
            response.message.should.equal(message);
        });

        it('should respond with a proper forbidden object (with data)', function() {
            var message = 'forbidden',
                data = {
                    errors: [message]
                },
                response = res.forbidden(message, data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.should.have.property('data');
            response.status.should.equal(403);
            response.message.should.equal(message);
            response.data.should.equal(data);
        });
    });

    describe('Conflict', function() {
        it('should respond with a proper conflict object ', function() {
            var message = 'conflict',
                data = {},
                err = null,
                response = res.conflict(err, message, data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.status.should.equal(409);
            response.message.should.equal(message);
        });

        it('should respond with a proper conflict object (with data)', function() {
            var message = 'conflict',
                data = {},
                err = {
                    message: 'Validation failed',
                    name: 'ValidationError',
                    errors: {
                        username: {
                            message: 'Validator "USERNAME_TAKEN" failed for path username',
                            name: 'ValidatorError',
                            path: 'username',
                            type: 'USERNAME_TAKEN'
                        }
                    }
                },
                response = res.conflict(err, message, data);

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.should.have.property('message');
            response.should.have.property('data');
            response.status.should.equal(409);
            response.message.should.equal(message);
            response.data.messages[0].should.equal(err.errors.username.message);
        });
    });

    describe('Error', function() {
        it('should respond with a proper error object', function() {
            var response = res.error();

            res.send.callCount.should.equal(1);
            response.should.have.property('status');
            response.status.should.equal(500);
        });
    });
});
