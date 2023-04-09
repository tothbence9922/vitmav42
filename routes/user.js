const checkPassword = require('../middlewares/auth/checkPassword');
const renderMiddleware = require('../middlewares/renderMiddleware');


const createUser = require('../middlewares/user/register');

const User = {}

module.exports = function (app) {

  const objectRepository = {
    User: User
  };

  app.use(
    '/',
    checkPassword(objectRepository),
    renderMiddleware(objectRepository, 'index')
  );

  app.use(
    '/register',
    createUser(objectRepository),
    renderMiddleware(objectRepository, 'register')
  );

}