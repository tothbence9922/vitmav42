/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /pets
 * if the password is wrong, pass down a 'error' key on res.locals to indicate error
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    if (typeof req?.body?.password === 'undefined') {
      return next();
    }

    /**
     * TODO:
     * - Get user from DB
     * - Compare user.password with given password
     * - Act accordingly 
     */ 

    if (req?.body?.password === "asd") {
      req.session.token = true;
      return req.session.save(err => res.redirect('/pets'));
    }

    res.locals.username = req?.body?.username;
    res.locals.error = 'Hibás jelszó!';
    return next();
  };
};
