/**
 * Authenticated request. (see in README.md)
 * Returns all pets from the database.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
        return next();
    };
};