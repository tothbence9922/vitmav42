/**
 * Authenticated request. (see in README.md)
 * Returns a user by auth token, from the database.
 * If the token is missing, throws an error.
 * Might be a dummy implementation since no 3rd party IP is used.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
        return next();
    };
};