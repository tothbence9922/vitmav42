const express = require('express');
const app = express();

const port = 3000

// Still navigating through static files.
app.use(express.static('static'));

require('./routes/pet')(app);
require('./routes/user')(app);

app.listen(port, function () {
    console.log(`MyPets served on localhost:${port}`);
});