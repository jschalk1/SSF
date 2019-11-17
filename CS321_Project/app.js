// Express is for the management of general client-server interation. Manages routing, connections, data sending/receiving
const express = require('express');
// path lets us manipulate the file system to manage paths more easily
const path = require('path');
// body-parser is necesarry to interpret the body of the user's request appropriately
const bodyParser = require('body-parser');

// When we require files we created ourself, the variable we assign the require to takes the value of what the export was assigned in the exporting file.

// db = new Database()
const db = require('./backend/database/database');
// router = the router we used in the routes folder of the backend
const router = require('./backend/routes/schoolRoutes');

// create express app
const app = express();

// views is an express keyword for markup files. We are settinng the views location to the views folder of our project. Our views will take the form of pug files.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// for interpreting request bodies as json
app.use(express.json());
// for appropriate client body request parsing
app.use(bodyParser.urlencoded({ extended: false }));

// use the router from the routes file in the backend
// This should be the last app.use() we call so that all the above app.use() calls are applied to the router
app.use(router);

// render default home page
router.route('').get((req, res) => {
    res.render('home');
});

// connect to db
db.connect();
// drop collections if they exist and repopulate with dummy data
db.setup();

// listen on port 3000
const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));