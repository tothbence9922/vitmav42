const Schema = require('mongoose').Schema;
const db = require('../../util/db');

const Pet = db.model('Pet', {
  name: String,
  specie: String,
  breed: String,
  age: Number,
  description: String,
  ownerId: Schema.Types.ObjectId
});


module.exports = Pet;