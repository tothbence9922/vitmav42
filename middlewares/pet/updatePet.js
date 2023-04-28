/**
 * Authenticated request. (see in README.md)
 * Updates a pet in the database.
 * If any required field is missing, throws an error. 
 * (Id is required aswell in this case)
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  const Pet = requireOption(objectRepository, 'Pet');

  return async function(req, res, next) {
    if (
      typeof req?.body?.name === 'undefined' ||
      typeof req?.body?.specie === 'undefined' ||
      typeof req?.body?.age === 'undefined' ||
      typeof req?.body?.description === 'undefined'
    ) {
        return next();
    }

    if (Number.isNaN(parseInt(req.body.age, 10))) {
      return next(new Error('Age must be a number!'));
    }

    try {
      if (typeof res.locals.pet === 'undefined') {
        res.locals.pet = new Pet();
      }
  
      res.locals.pet._id = req?.params?._id;
      res.locals.pet.ownerId = req.body.ownerId;
      res.locals.pet.name = req.body.name;
      res.locals.pet.specie = req.body.specie;
      res.locals.pet.age = parseInt(req.body.age, 10); 
      res.locals.pet.description = req.body.description;
      
      const newValue = {
        name: req.body.name,
        specie: req.body.specie,
        age: req.body.age,
        description: req.body.description,
      };

      await Pet.findOneAndUpdate({_id: req?.params?.petId}, newValue);

    } catch (error) {

      return next(error);
    }

    return res.redirect("/pets");
  }
};