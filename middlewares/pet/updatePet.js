/**
 * Authenticated request.
 * Updates a pet in the database.
 * If any required field is missing, throws an error. 
 * (It is a PUT, not a PATCH. Id is required aswell in this case)
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        return next();
    };
};