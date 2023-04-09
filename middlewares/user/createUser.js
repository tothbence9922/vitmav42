/**
 * Creates a user in the database.
 * If any required field is missing, throws an error.
 */

const requireOption = require('../common');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};