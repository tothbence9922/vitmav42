/**
 * Authenticated request. (see in README.md)
 * Returns all pets from the database.
 */

const requireOption = require('../requireOption');
const mockPets = require('../../mock/pet/petList')

module.exports = function(objectRepository) {
  return function(req, res, next) {
      res.locals.pets = mockPets;  
      return next();
    };
};