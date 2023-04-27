const renderMiddleware = require('../middlewares/renderMiddleware');

const auth = require('../middlewares/auth/auth');

const createPet = require('../middlewares/pet/createPet');
const getPetById = require('../middlewares/pet/getPetById');
const getPets = require('../middlewares/pet/getPets');
const removePetById = require('../middlewares/pet/removePetById');
const updatePet = require('../middlewares/pet/updatePet');
const getUserByToken = require('../middlewares/user/getUserByToken');

const Pet = require('../model/pet/pet');
const User = require('../model/user/user');

module.exports = function (app) {

  const objectRepository = {
    Pet: Pet,
    User: User
  };

  app.get(
    '/pets/create',
    auth(objectRepository),
    renderMiddleware(objectRepository, 'addPet')
  );
  app.use(
    '/pets/create',
    auth(objectRepository),
    createPet(objectRepository),
  );

  app.get(
    '/pets',
    auth(objectRepository),
    getUserByToken(objectRepository),
    getPets(objectRepository),
    renderMiddleware(objectRepository, 'petList')
  );

  app.get(
    '/pets/:petId',
    auth(objectRepository),
    getPetById(objectRepository),
    renderMiddleware(objectRepository, 'petDetails')
  );

  app.get(
    '/pets/:petId/update',
    auth(objectRepository),
    getPetById(objectRepository),
    renderMiddleware(objectRepository, 'editPet')
  );
  app.use(
    '/pets/:petId/update',
    auth(objectRepository),
    getPetById(objectRepository),
    updatePet(objectRepository),
  );

  app.get(
    '/pets/:petId/delete',
    auth(objectRepository),
    removePetById(objectRepository),
  );

}