/**
 * Authenticated request.
 * Returns a user by id, from the database.
 * If the id is missing, throws an error.
 */

const requireOption = require('../common');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};