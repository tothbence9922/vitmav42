/**
 * Authenticated request. (see in README.md)
 * Returns all pets from the database.
 */

const requireOption = require('../requireOption');
const mockPets = require('../../mock/pet/petList')

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');
  const Pet = requireOption(objectRepository, 'Pet');

  return async function(req, res, next) {

    try {
      const user = await User.findOne({username: req.session.token}).exec(); // using mocked identity

      if (user){
        const pets = await Pet.find({ownerId: user._id}).exec(); // using mocked identity

        res.locals.pets = pets;  

      } else {
        res.redirect(`/`);
      }
    } catch (error) {
      return next(error);
    }
    return next();
  }
};