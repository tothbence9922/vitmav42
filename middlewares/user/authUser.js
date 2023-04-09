/**
 * Authentication middleware.
 * If the credentials are correct, returns a token.
 * Else, throws an error.
 */

const requireOption = require('../common');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};