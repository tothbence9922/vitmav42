const renderMiddleware = require('../middlewares/renderMiddleware');

const auth = require('../middlewares/auth/auth');

const createPet = require('../middlewares/pet/createPet');
const getPetById = require('../middlewares/pet/getPetById');
const getPets = require('../middlewares/pet/getPets');
const removePetById = require('../middlewares/pet/removePetById');
const updatePet = require('../middlewares/pet/updatePet');
const getUserByToken = require('../middlewares/user/getUserByToken');

const Pet = {}

module.exports = function (app) {

  const objectRepository = {
    Pet: Pet
  };

  app.use(
    '/pets/create',
    createPet(objectRepository),
    renderMiddleware(objectRepository, 'addPet')
  );

  app.get(
    '/pets',
    getUserByToken(objectRepository),
    getPets(objectRepository),
    renderMiddleware(objectRepository, 'petList')
  );

  app.get(
    '/pets/:petId',
    getPetById(objectRepository),
    renderMiddleware(objectRepository, 'petDetails')
  );

  app.use(
    '/pets/:petId/update',
    getPetById(objectRepository),
    updatePet(objectRepository),
    renderMiddleware(objectRepository, 'editPet')
  );

  app.get(
    '/pets/:petId/delete',
    auth(objectRepository),
    removePetById(objectRepository),
  );

}