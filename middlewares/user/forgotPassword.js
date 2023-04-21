/**
 * Dummy method for forgotten password.
 * Console logging the user's password.
 * Redirects to login screen on success.
 */

const requireOption = require('../requireOption');
const mockUser = require('../../mock/user/user');

module.exports = function(objectRepository) {
  return function(req, res, next) {
    console.log(mockUser.password);
    res.redirect('/');
  };
};