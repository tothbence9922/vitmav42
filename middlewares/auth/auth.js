/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    if (typeof req.session.token === 'undefined' || req.session.token !== true) {
      return res.redirect('/');
    }
    next();
  };
};