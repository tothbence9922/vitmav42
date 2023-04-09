const express = require('express');
const app = express();

require('./routes/pet')(app);
require('./routes/user')(app);

app.listen(3000, function () {
    console.log('Hello :3000');
});