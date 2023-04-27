/**
 * Authenticated request. (see in README.md)
 * Removes a pet by id from the database.
 * Redirects to petList on success.
 * If the id is missing, throws an error.
 */

const requireOption = require('../requireOption');
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = function(objectRepository) {
  const Pet = requireOption(objectRepository, 'Pet');

  return async function(req, res, next) {
    if (typeof req?.params?.petId === 'undefined'){
      return res.redirect('/pets');
    }
    try {
      const petToDelete = await Pet.findByIdAndRemove(req?.params?.petId).exec();
    } catch (error) {
      return next(error);
    }
    return res.redirect('/pets');
  };
};