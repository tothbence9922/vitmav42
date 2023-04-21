/**
 * Authenticated request. (see in README.md)
 * Removes a pet by id from the database.
 * Redirects to petList on success.
 * If the id is missing, throws an error.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    /* TODO: Remove given pet from the DB */
    return res.redirect('/pets');
  };
};