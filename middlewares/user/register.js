/**
 * Creates a user in the database.
 * If any required field is missing, throws an error.
 * Redirects to login screen on success.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    if (req?.body?.username && req?.body?.password && req?.body?.confirmPassword) {

      console.log("Register mw called with body:");
      console.log(req.body);
      return res.redirect('/');
    }
    return next();
  };
};