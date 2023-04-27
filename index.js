const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use(
    session({
        secret: 'secret'
    })
);

// Load routing
require('./routes/pet')(app);
require('./routes/user')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(port, function () {
    console.log(`MyPets served on localhost:${port}`);
});