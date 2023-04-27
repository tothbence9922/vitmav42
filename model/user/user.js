const db = require('../../util/db');

const User = db.model('User', {
  username: String,
  password: String
});

module.exports = User;