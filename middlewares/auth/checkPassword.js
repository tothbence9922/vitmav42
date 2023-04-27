/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /pets
 * if the password is wrong, pass down a 'error' key on res.locals to indicate error
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  const User = requireOption(objectRepository, 'User');

  return async function(req, res, next) {
    if (
      typeof req?.body?.username === 'undefined' ||
      typeof req?.body?.password === 'undefined'
    ) {
      return next();
    }

    try {
      const user = await User.findOne({username: req.username}).exec();

      if (req.body.password === user.password) {
        req.session.token = req.username + ':' + user.password; // Mocking identity providing
        return req.session.save(err => res.redirect('/pets'));
      }

    } catch (error) {
      return next(error);
    }

    

    res.locals.username = req?.body?.username;
    res.locals.error = 'Hibás jelszó!';
    return next();
  };
};
