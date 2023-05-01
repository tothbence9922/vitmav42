const expect = require('chai').expect;
const getPetById = require('../../../../middlewares/pet/getPetById');

const mockPet = {
  _id: '22',
  name: 'Test Pet',
  age: '1',
  specie: 'Dog',
  description: 'This is a test pet'
};

describe('getPetById middleware', () => {
  it('Should set res.locals.pet with a pet object from the database', (done) => {
    const mw = getPetById({
      Pet: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findById: (id) => ({
          exec: () => {
            expect(id).to.be.eql('22');
            return {...mockPet};
          } 
        })
      }
    });

    const resMock = {
      locals: {
        pet: {},
      },
      redirect: () => {}
    };

    mw(
      {
        params: {
          petId: '22'
        }
      },
      resMock,
      (error) => {
        expect(error).to.be.eql(undefined);
        expect(resMock.locals.pet).to.be.eql({...mockPet});
        done();
      }
    );
  });

  it('Should call next with error if there is a db problem', (done) => {
    const mw = getPetById({
      Pet: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findById: (id) => ({
          exec: () => {
            throw new Error('Database error occured'); // mocking db error
          } 
        })
      }
    });

    const resMock = {
      locals: {
        pet: {},
      },
      redirect: () => {}
    };

    mw(
      {
        params: {
          petId: '22'
        }
      },
      resMock,
      (error) => {
        expect(error.message).to.be.eql('Database error occured');
        done();
      }
    );
  });

  it('Should init res.locals.pet with new Pet() if pet not found', (done) => {
    const mw = getPetById({
      Pet: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findById: (id) => ({
          exec: () => {
            return { code: 404, statusMessage: 'Not found'}; // mock 'not found in db'
          } 
        })
      }
    });

    const resMock = {
      locals: {
        pet: undefined
      },
      redirect: (path) => {
        console.log(path);
        done();
      }
    };

    mw(
      {
        params: {
          petId: '22'
        }
      },
      resMock,
      () => {}
    );

  });
})