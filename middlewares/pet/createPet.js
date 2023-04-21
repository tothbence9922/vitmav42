/**
 * Authenticated request. (see in README.md)
 * Creates a pet in the database.
 * If any required field is missing, throws an error.
 */

const requireOption = require('../requireOption');
const mockUser = require('../../mock/user/user');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    /**
     * TODO:
     * - Get {
     *  name: string,
     *  specie: string,
     *  age: number,
     *  description: string,
     * } from the req.body
     * - Store in the DB
     * - Redirect to /pets
     */
    console.log({
      ownerId: mockUser.id, /* TODO: add ownerId to Pet model */
      name: req?.body?.name,
      specie: req?.body?.specie,
      age: parseInt(req?.body?.age),
      description: req?.body?.description,
    });
    return res.redirect("/pets");
  };
};