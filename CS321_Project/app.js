/* require 3 modules to start:
express, morgan, and path */

const express = require('express');
const path = require('path');
const logger = require('morgan');


//create express application object
const app = express();

/* app.set() methods to set up mobile first preferences and make 
    our current directory the default */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* app.use() methods to add middleware functionality like our morgan
    logger */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* app.get() method(s) to add routes to our site. create vars to keep
    variables local and not static */

/* the first paramter is the route needed to access this page, leaving it empty 
    simply requires localhost:3000 */
app.get('', (req, res) => {

    /* choose which .pug folder you want to use from as the parameter of res.render,
        then set the variables that are in the .pug file you chose */
    res.render('home', {
        
    });
});

/* because we are using '/home' as our paramter, our webpage for this route will
only be visible at localhost:3000/home */
app.get('/home', (req, res) => {

    res.render('home', {

    });
});

app.get('/leagues', (req, res) => {

    res.render('leagues', {

    });
});




const port = 3000;

// the character in console.log() is the upper left back tick, not an apostrophe
app.listen(port, () => console.log(`Listening on port: ${port}`));