/**
 * Creates a user in the database.
 * If any required field is missing, throws an error.
 * Redirects to login screen on success.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    if (req?.body?.username && req?.body?.password && req?.body?.confirmPassword) {
      if ( req?.body?.password ===  req?.body?.confirmPassword) {
        return res.redirect('/');
      } else {
        res.locals.username = req?.body?.username;
        res.locals.error = "Passwords don't match!";
      }
    }
    return next();
  };
};