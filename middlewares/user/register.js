/**
 * Creates a user in the database.
 * If any required field is missing, throws an error.
 * Redirects to login screen on success.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');

  return function(req, res, next) {

    if (
      typeof req?.body?.username === 'undefined' ||
      typeof req?.body?.password === 'undefined' ||
      typeof req?.body?.confirmPassword === 'undefined'
    ) {
        return next();
    }

    if (typeof res.locals.user === 'undefined') {
      res.locals.user = new User();
    }

    if ( req.body.username && req.body.password && req.body.confirmPassword ) {
      if ( req.body.password ===  req.body.confirmPassword ) {

        res.locals.user.name = req.body.username;
        res.locals.user.password = req.body.password;

        try {
          res.locals.user.save();
        } catch (error) {
          return next(error);
        }
         
        return res.redirect(`/`);
      } else {
        res.locals.username = req?.body?.username;
        res.locals.error = "Passwords don't match!";
      }
    }
    return next();
  };
};