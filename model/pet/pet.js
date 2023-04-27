const Schema = require('mongoose').Schema;
const db = require('../../util/db');

const Pet = db.model('Pet', {
  name: String,
  specie: String,
  breed: String,
  age: String,
  description: String,
  _ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'OwnerId'
  }
});


module.exports = Pet;