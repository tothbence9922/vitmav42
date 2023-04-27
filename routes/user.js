const checkPassword = require('../middlewares/auth/checkPassword');
const logout = require('../middlewares/auth/logout');
const renderMiddleware = require('../middlewares/renderMiddleware');
const forgotPassword = require('../middlewares/user/forgotPassword');


const createUser = require('../middlewares/user/register');

const User = require('../model/user/user');

module.exports = function (app) {

  const objectRepository = {
    User: User
  };


  app.use(
    '/register',
    createUser(objectRepository),
    renderMiddleware(objectRepository, 'register')
  );
  
  app.use(
    '/logout',
    logout(objectRepository),
  );

  app.get(
    '/forgot-password',
    forgotPassword(objectRepository),
  );

  app.use(
    '/',
    checkPassword(objectRepository),
    renderMiddleware(objectRepository, 'index')
  );
}