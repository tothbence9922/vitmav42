# Vitmav42

This is my repository for a course with the code VITMAV42.

## INFO:

- Required node version in .nvmrc
- The application requires a local MongoDB (util/db -> connection string if its ran elsewhere)
- Install dependencies via `npm i`
- Run the project via `npm run start`
- Authenticated request: Middlewares that require authentication have a comment that states it is an Authenticated request. This means that no matter the implementation of the authentication, authentication will be applied (may be a password string match for demo/homework purposes, should be a third party Identity Provider usage in a more serious context).
- Run the test via `npm run test`
- Run the test coverage via `npm run test:coverage`
- Test coverage and details are available by opening `coverage/index.html` in a browser (firefox tested).