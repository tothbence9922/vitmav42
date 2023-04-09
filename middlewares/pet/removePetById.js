/**
 * Authenticated request.
 * Removes a pet by id from the database.
 * Redirects to petList on success.
 * If the id is missing, throws an error.
 */

const requireOption = require('../common');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};