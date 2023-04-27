/**
 * Authenticated request. (see in README.md)
 * Creates a pet in the database.
 * If any required field is missing, throws an error.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');
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

    try {
      const user = await User.findOne({username: req.session.token}).exec(); // using mocked identity

      if (user){

        if (typeof res.locals.pet === 'undefined') {
          res.locals.pet = new Pet();
        }
    
        res.locals.pet.ownerId = user._id;
        res.locals.pet.name = req.body.name;
        res.locals.pet.specie = req.body.specie;
        res.locals.pet.age = req.body.age; 
        res.locals.pet.description = req.body.description;

        try {
          res.locals.pet.save();
        } catch (error) {
          return next(error);
        }

      } else {
        res.redirect(`/`);
      }
    } catch (error) {
      return next(error);
    }

    return res.redirect("/pets");
  };
};