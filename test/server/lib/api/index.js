'use strict';

require('chai').should();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const joi = require('joi');

const Api = require('../../../../server/lib/api');
const ApiError = require('../../../../server/lib/api/error');

const checkResponse = (res, expectBody) => {
    res.statusCode.should.be.equal(200);
    res.headers['content-type'].should.be.match(/json/);
    res.body.should.be.deep.equal(expectBody);
};

describe('Api', () => {
    let app;
    let api;

    beforeEach(() => {
        api = new Api();
        app = express();
        app.use(bodyParser.json());
        app.use(api.getRouter());
    });

    describe('adding route', () => {
        it('should add new handler of given path', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok')
            });

            return request(app)
                .get('/foo')
                .then((res) => {
                    checkResponse(res, {data: 'ok'});
                });
        });

        it('should handle POST http method by default', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok')
            });

            return request(app)
                .post('/foo')
                .then((res) => {
                    checkResponse(res, {data: 'ok'});
                });
        });

        it('should return Api instance', () => {
            const res = api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok')
            });
            res.should.be.deep.equal(api);
        });
    });

    describe('when handler resolves promise without data', () => {
        it('should return null in data', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve()
            });

            return request(app)
                .get('/foo')
                .then((res) => {
                    checkResponse(res, {data: null});
                });
        });
    });

    describe('when handler rejects promise', () => {
        describe('when error is not instance of ApiError', () => {
            it('should ignore `code` and `message` properties', () => {
                api.addRoute({
                    path: '/foo',
                    handler: () => {
                        const err = new Error('Bad request');
                        err.code = 400;
                        return Promise.reject(err);
                    }
                });

                return request(app)
                    .get('/foo')
                    .then((res) => {
                        checkResponse(res, {
                            error: {
                                code: 500,
                                message: 'Internal error'
                            }
                        });
                    });
            });
        });

        describe('when error is instance of ApiError', () => {
            it('should use `code` and `message` properties', () => {
                api.addRoute({
                    path: '/foo',
                    handler: () => Promise.reject(new ApiError(401, 'Authorization required'))
                });

                return request(app)
                    .get('/foo')
                    .then((res) => {
                        checkResponse(res, {
                            error: {
                                code: 401,
                                message: 'Authorization required'
                            }
                        });
                    });
            });

            it('should use `code` as `message` properties with one argument', () => {
                api.addRoute({
                    path: '/foo',
                    handler: () => Promise.reject(new ApiError(''))
                });

                return request(app)
                    .get('/foo')
                    .then((res) => {
                        checkResponse(res, {
                            error: {
                                code: 500,
                                message: ''
                            }
                        });
                    });
            });
        });

        describe('when error is not instance of Error', () => {
            it('should respond with internal error', () => {
                api.addRoute({
                    path: '/foo',
                    handler: () => Promise.reject('error')
                });

                return request(app)
                    .get('/foo')
                    .then((res) => {
                        checkResponse(res, {
                            error: {
                                code: 500,
                                message: 'Internal error'
                            }
                        });
                    });
            });
        });

        describe('when no reason', () => {
            it('should respond with internal error', () => {
                api.addRoute({
                    path: '/foo',
                    handler: () => Promise.reject()
                });

                return request(app)
                    .get('/foo')
                    .then((res) => {
                        checkResponse(res, {
                            error: {
                                code: 500,
                                message: 'Internal error'
                            }
                        });
                    });
            });
        });
    });

    describe('validation', () => {
        it('should validate query parameters', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok'),
                validation: {
                    query: {
                        limit: joi.number()
                    }
                }
            });

            return request(app)
                .get('/foo')
                .query({limit: 'aaa'})
                .then((res) => {
                    checkResponse(res, {
                        error: {
                            code: 400,
                            message: '"limit" must be a number'
                        }
                    });
                });
        });

        it('should validate route parameters', () => {
            api.addRoute({
                path: '/foo/:name',
                handler: () => Promise.resolve('ok'),
                validation: {
                    params: {
                        name: joi.string().min(3)
                    }
                }
            });

            return request(app)
                .get('/foo/tj')
                .then((res) => {
                    checkResponse(res, {
                        error: {
                            code: 400,
                            message: '"name" length must be at least 3 characters long'
                        }
                    });
                });
        });

        it('should validate body parameters', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok'),
                validation: {
                    body: {
                        name: joi.string().min(3)
                    }
                }
            });

            return request(app)
                .post('/foo')
                .send({name: 'tj', age: 1})
                .then((res) => {
                    checkResponse(res, {
                        error: {
                            code: 400,
                            message: '"name" length must be at least 3 characters long'
                        }
                    });
                });
        });

        it('should validate headers', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok'),
                validation: {
                    headers: {
                        accesstoken: joi.string().required()
                    }
                }
            });

            return request(app)
                .get('/foo?accesstoken=1')
                .then((res) => {
                    checkResponse(res, {
                        error: {
                            code: 400,
                            message: '"accesstoken" is required'
                        }
                    });
                });
        });

        it('should not change validated parameters', () => {
            api.addRoute({
                path: '/foo',
                handler: (req) => new Promise((resolve) => {
                    req.query.a.should.be.equal('test');
                    resolve('ok');
                }),
                validation: {
                    query: {
                        a: joi.string().uppercase()
                    }
                }
            });

            return request(app)
                .get('/foo?a=test')
                .then((res) => checkResponse(res, {data: 'ok'}));
        });

        it('should allow unknown parameters', () => {
            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok'),
                validation: {
                    query: {}
                }
            });

            return request(app)
                .get('/foo?a')
                .then((res) => checkResponse(res, {data: 'ok'}));
        });

        it('should skip body params validation without bodyParser middleware', () => {
            const api = new Api();
            const app = express();
            app.use(api.getRouter());

            api.addRoute({
                path: '/foo',
                handler: () => Promise.resolve('ok'),
                validation: {
                    body: {
                        name: joi.string().min(3)
                    }
                }
            });

            return request(app)
                .post('/foo')
                .send({name: 'tj', age: 1})
                .then((res) => checkResponse(res, {data: 'ok'}));
        });
    });
});
