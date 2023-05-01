const expect = require('chai').expect;
const checkPassword = require('../../../../middlewares/auth/checkPassword');

const mockUser = {
  username: 'TestUser',
  password: 'TestPassword'
};

const DB_ERROR_TEXT = 'Database error occured';

describe('checkPassword middleware', () => {
  it('Should call next when password and/or username is missing, leaving req.session.token as is (undefined)', (done) => {
    const mw = checkPassword({
      User: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findOne: () => ({ // Not called, next() returned before reaching this part
          exec: () => {} 
        })
      }
    });

    const reqMock = {
      body: {
        username: undefined,
        password: undefined
      },
      session: {
        token: undefined
      }
    };

    const resMock = {
      locals: {
        username: undefined,
        error: undefined
      }
    };

    mw(
      reqMock,
      resMock,
      () => {
        expect(reqMock.session.token).to.be.eql(undefined);
        done();
      }
    );
  });
  
  it('Should set req.session.token with the username if the passwords match', (done) => {
    const mw = checkPassword({
      User: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findOne: ({ username }) => ({
          exec: () => {
            expect(username).to.be.eql('TestUser');
            return { ...mockUser};
          }
        })
      }
    });

    const resMock = {
      locals: {
        username: '',
        error: ''
      },
      redirect: () => {
        expect(reqMock.session.token).to.be.eql('TestUser');
        done();
      }
    };

    const reqMock = {
      body: {
        username: 'TestUser',
        password: 'TestPassword'
      },
      session: {
        token: 'null',
        save: (cb) => {cb()}
      }
    };

    mw(
      reqMock,
      resMock,
      () => {}
    );
  });
  
  it('Should set res.username and res.error when the passwords mismatch', (done) => {
    const mw = checkPassword({
      User: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findOne: ({ username }) => ({
          exec: () => {
            expect(username).to.be.eql('TestUser');
            return {...mockUser, password: 'A different password'};
          } 
        })
      }
    });

    const resMock = {
      locals: {}
    };

    mw(
      {
        body: { ...mockUser },
        session: {
          token: undefined
        }
      },
      resMock,
      () => {
        expect(resMock.locals.username).to.be.eql(mockUser.username);
        expect(resMock.locals.error).to.be.eql('Wrong password!');
        done();
      }
    );
  });

  it('Should call next with error if there is a db problem', (done) => {
    const mw = checkPassword({
      User: {
        // Newer version of mongoose is used, no cb syntax => testing is different too
        findOne: ({ username }) => ({
          exec: () => {
            expect(username).to.be.eql('TestUser');
            throw new Error(DB_ERROR_TEXT); // mocking db error
          } 
        })
      }
    });

    const reqMock = {
      body: { ...mockUser }
    };

    const resMock = {};

    mw(
      reqMock,
      resMock,
      (error) => {
        expect(error.message).to.be.eql(DB_ERROR_TEXT);
        done();
      }
    );
  });
});