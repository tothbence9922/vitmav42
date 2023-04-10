/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /nagymama
 * if the password is wrong, pass down a 'error' key on res.locals to indicate error
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
        if (typeof req?.body?.password === 'undefined') {
            return next();
        }

        if (req?.body?.password === "asd") {
            req.session.token = true;
            return req.session.save(err => res.redirect('/pets'));
        }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };
};
