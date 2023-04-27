/**
 * Dummy method for forgotten password.
 * Console logging the user's password.
 * Redirects to login screen on success.
 */

const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');

  return async function(req, res, next) {
    if (
      typeof req?.body?.username === 'undefined' 
    ) {
      return next();
    }

    try {
      const user = await User.findOne({username: req.body.username}).exec();

      if (user) {
        console.log("Current user:password is: " + req.body.username + ":" + user.password);
      }

    } catch (error) {
      return next(error);
    }

    res.redirect('/');
  };
};