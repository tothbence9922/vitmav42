/**
 * Authenticated request. (see in README.md)
 * Updates a pet in the database.
 * If any required field is missing, throws an error. 
 * (Id is required aswell in this case)
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    /**
     * TODO:
     * - Get {
     *  id: number,
     *  ownerId: number,
     *  name: string,
     *  specie: string,
     *  age: number,
     *  description: string,
     * } from the req.body
     * - Update in the DB
     * - Redirect to /pets
     */
    console.log({
      id: req?.body?.id,
      ownerId: req?.body?.ownerId,
      name: req?.body?.name,
      specie: req?.body?.specie,
      age: parseInt(req?.body?.age),
      description: req?.body?.description,
    });
    return res.redirect("/pets");
  };
};