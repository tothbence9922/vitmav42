/**
 * Authenticated request. (see in README.md)
 * Returns a pet by id, from the database.
 * If the id is missing, throws an error.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const Pet = requireOption(objectRepository, 'Pet');
    return async function(req, res, next) {
      try {
        const pet = await Pet.findById(req?.params?.petId).exec();


        if (typeof res.locals.pet === 'undefined'){
          res.locals.pet = new Pet();
        }

        if (pet) {
          res.locals.pet._id = req?.params?.petId;
          res.locals.pet.name = pet.name;
          res.locals.pet.age = pet.age;
          res.locals.pet.specie = pet.specie;
          res.locals.pet.description = pet.description;
        } else {
          return res.redirect('/pets');
        }
  
      } catch (error) {
        return next(error);
      }
      return next();
    };
};