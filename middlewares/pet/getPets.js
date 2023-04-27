/**
 * Authenticated request. (see in README.md)
 * Returns all pets from the database.
 */

const requireOption = require('../requireOption');
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');
  const Pet = requireOption(objectRepository, 'Pet');

  return async function(req, res, next) {

    try {
      const user = await User.findOne({username: req.session.token}).exec(); // using mocked identity

      if (user){
        const pets = await Pet.find({ownerId: user._id}).exec(); // using mocked identity
        res.locals.pets = pets.map(( {_id, name, age, specie, description, ownerId})=> ({
          _id: new ObjectId(_id),
          name,
          age,
          specie,
          description,
          ownerId
        }));  
      } else {
        res.redirect(`/`);
      }
    } catch (error) {
      return next(error);
    }
    return next();
  }
};