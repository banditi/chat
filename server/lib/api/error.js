'use strict';

/**
 * @class Вспомогательный класс для создания ошибки апи. Позволяет передать код ошибки из обработчика запроса.
 */
class ApiError extends Error {
    /**
     * @param {Number} [code=500] Код ошибки.
     * @param {String} [message=""] Сообщение об ошибке.
     */
    constructor(code, message) {
        super(code, message);

        if (typeof code !== 'number') {
            message = code;
            code = 500;
        }
        Error.captureStackTrace(this, ApiError);
        this.name = 'ApiError';
        this.message = message || '';
        this.code = code;
    }
}

module.exports = ApiError;
