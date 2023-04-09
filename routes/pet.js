const renderMiddleware = require('../middlewares/renderMiddleware');

const auth = require('../middlewares/auth/auth');

const createPet = require('../middlewares/pet/createPet');
const getPetById = require('../middlewares/pet/getPetById');
const getPets = require('../middlewares/pet/getPets');
const removePetById = require('../middlewares/pet/removePetById');
const updatePet = require('../middlewares/pet/updatePet');
const getUserById = require('../middlewares/user/getUserById');

const Pet = {}

module.exports = function (app) {

  const objectRepository = {
    Pet: Pet
  };

  app.use(
    '/pets/create',
    auth(objectRepository),
    createPet(objectRepository),
    renderMiddleware(objectRepository, 'addPet')
  );

  app.get(
    '/pets',
    auth(objectRepository),
    getUserById(objectRepository),
    getPets(objectRepository),
    renderMiddleware(objectRepository, 'petList')
  );

  app.get(
    '/pets/:petId',
    auth(objectRepository),
    getPetById(objectRepository),
    renderMiddleware(objectRepository, 'petDetails')
  );

  app.use(
    '/pets/:petId/update',
    auth(objectRepository),
    getPetById(objectRepository),
    updatePet(objectRepository),
    renderMiddleware(objectRepository, 'editPet')
  );

  app.delete(
    '/pets/:petId/delete',
    auth(objectRepository),
    removePetById(objectRepository),
  );

}