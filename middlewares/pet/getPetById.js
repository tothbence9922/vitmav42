/**
 * Authenticated request. (see in README.md)
 * Returns a pet by id, from the database.
 * If the id is missing, throws an error.
 */

const requireOption = require('../requireOption');
const mockPets = require('../../mock/pet/petList')

module.exports = function(objectRepository) {
  return function(req, res, next) {
    res.locals.pet = mockPets.find(pet => pet.id === parseInt(req?.params?.petId));
    return next();
  };
};