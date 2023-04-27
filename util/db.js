const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vitmav42', { useNewUrlParser: true });

module.exports = mongoose;