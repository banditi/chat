'use strict';

const express = require('express');
const validateRequest = require('./validate-request');
const ApiError = require('./error');

/**
 * Обработчик запроса апи.
 *
 * @typedef {Function} Handler
 * @param {express.Request} req
 * @returns {Promise} Успешно завершенный промис соответствует успешному ответу, а значение промиса
 *      используется в качестве тела ответа. Промис завершенный c ошибкой соответствует ответу с
 *      ошибкой 500 "Internal error". Если необходимо вернуть другой код ошибки или сообщение, нужно
 *      реджектить промис экземпляром `ApiError`.
 */

class Api {
    constructor() {
        this._router = express.Router();
    }

    /**
     * Возвращает роутер. Может быть смонтирован приложением по нужному пути.
     *
     * @example
     * app.use('/api', api.getRouter());
     *
     * @returns {express.Router}
     */
    getRouter() {
        return this._router;
    }

    /**
     * Добавляет новый маршрут.
     *
     * @param {Object} options
     * @param {String} options.path Путь маршрута.
     * @param {Handler} options.handler Обработчик запроса, вызываемый после успешной валидации запроса.
     * @param {Object} [options.validation] Параметры валидации.
     * @param {Object} [options.validation.query] Описание проверок для параметров в строке запроса.
     * @param {Object} [options.validation.params] Описание проверок для параметров в пути.
     * @param {Object} [options.validation.body] Описание проверок для параметров в теле запроса.
     * @param {Object} [options.validation.headers] Описание проверок для http заголовков запроса.
     * @returns {Api}
     */
    addRoute(options) {
        const handler = (req, res) => {
            if (options.validation) {
                const result = validateRequest(req, options.validation);
                if (!result.isValid) {
                    res.send({
                        error: {
                            code: 400,
                            message: result.message
                        }
                    });
                    return;
                }
            }

            options.handler(req).then(
                (data) => {
                    if (data === undefined) {
                        data = null;
                    }
                    res.send({data: data});
                },
                (error) => {
                    // HTTP статус ответа - всегда 200. Это сделано, потому что ответ публичных сервисов
                    // с кодом 500 и 404 подменяется nginx'ом на специальную html страницу.
                    // Таким образом, теряется тело ответа.
                    res.send({
                        error: {
                            code: error instanceof ApiError ? error.code : 500,
                            message: error instanceof ApiError ? error.message : 'Internal error'
                        }
                    });
                }
            );
        };

        ['get', 'post'].forEach((method) => {
            this._router[method](options.path, handler);
        });

        return this;
    }
}

module.exports = Api;
