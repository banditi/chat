'use strict';

const joi = require('joi');

/**
 * Результат проверки.
 *
 * @typedef {Object} ValidationResult
 * @property {Boolean} isValid
 * @property {String} [message]
 */

/**
 * Проверяет запрос на соответствие схемам.
 *
 * @param {express.Request} req
 * @param {Object} schemas
 * @returns {ValidationResult}
 */
module.exports = function (req, schemas) {
    let result = validate(req.params, schemas.params);
    if (!result.isValid) {
        return result;
    }

    result = validate(req.query, schemas.query);
    if (!result.isValid) {
        return result;
    }

    result = validate(req.body, schemas.body);
    if (!result.isValid) {
        return result;
    }

    return validate(req.headers, schemas.headers);
};

function validate(value, schema) {
    if (!value || !schema) {
        return {isValid: true};
    }

    const result = joi.validate(value, schema, {allowUnknown: true});
    if (result.error) {
        return {
            isValid: false,
            message: result.error.details[0].message
        };
    }

    return {isValid: true};
}
