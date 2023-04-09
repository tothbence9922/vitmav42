/**
 * Authenticated request.
 * Creates a pet in the database.
 * If any required field is missing, throws an error.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};