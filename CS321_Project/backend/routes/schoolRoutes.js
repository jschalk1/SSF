// import the express router to set up different routes (url paths) 
const router = require('express').Router()
// import the two schemas we made so we can perform CRUD (create-retrieve-update-delete) database operations on the collections and documents those schemas enforce
const teamSchema = require('../database/teamSchema')
const schoolSchema = require('../database/schoolSchema')

// helper function that capitalizes the first letter of a string
let capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1)
}

// helper function that lower cases the first letter of a string
let lowercase = (word) => {
    return word[0].toLowerCase() + word.slice(1)
}

// This route shows the list of schools for the selected city
// The route in the browser would appear as 'localhost:3000/schools', the '/schools' is enforced as the paremeter of router.route()
// This route uses the HTTP POST method to transfer data from client to server. HTTP POST sends data in the body of a client request rather than the parameters(url) like HTTP GET
// Transfering data in the body of a request is more secure but removes the ability to create unique, bookmarable routes for different user queries since no matter what city is enter the users route will be 'localhost:3000/schools' rather than something like localhost:3000/schools/colleges/Edwardsville/Illinois
router.route('/schools').post((req, res) => {

    // lots of error checking needs to be done here to avoid using undefined data

    // get the city the user entered in the form from the body of the clients request
    // this data is defined in home.pug in the form input with the attribute name='cityHS'/name='cityCollege'
    let cityHS = req.body.cityHS;
    let cityCollege = req.body.cityCollege;

    // declare these variables here so we don't have scope issues using them later
    // result is the result of the city string split into each of its distinct comma seperated parts since the google API seperates queries with commas
    let result;
    // level is the school level - either highschool or college
    let level;

    // only one of the two, cityHS or cityCollege, will be defined since the user can only click submit on one. We'll assign value to the one that is defined
    if (cityHS) {
        result = cityHS.split(', ');
        level = 'highschool';
        displayLevel = 'Highschools';
    } else {
        result = cityCollege.split(', ');
        level = 'college';
        displayLevel = 'Colleges';
    }

    // Get the length of resulting array above. This is what we can use to error check. If an array has a length of three then that array should contain [ city, state, country]. If it is length five it should contain [ organization, street, city, state, country]
    let l = result.length;

    // country always last element, state next to last, city 3rd from last, street 4th to last, organization 5th to last in the result array.
    let organization = result[l-5];
    let street = result[l-4];
    let city = result[l-3];
    let state = result[l-2];
    let country = result[l-1];

    // find all the schools in the city and state the user searched for at the level the selected (highschool or college)
    // the find() method returns a promise that can either be resolved(success) or rejected(failure)
    schoolSchema.find( {city: city, state: state, level: level} )
        // take the array of schools the find() returned, render the schools.pug file and set the variables(city and schools) of that pug file
        // 'schools' directly below in the .then() is the array of schools returned from the database find() above
        // .then() contains the code to run if the promise is resolved
        .then(schools => {

            res.render('schools', {
                // set the city variable in the schools.pug file to the appropriate string for Level, city, and state to be displayed as the page title
                city: `${displayLevel}: ${city}, ${state}`,
                // set the schools variable in the schools.pug file eqaul to the sorted array of schools the find() query returned
                schools: schools.sort()
            })

        })
        // .catch() contains the code to run if the promise is rejected, we just return a json response to the client of the error that occurred. This will be displayed in their browser, but it shouldn't ever be reached
        .catch(err => res.json(`Failed to find schools in ${city}, ${state}: ${err}`));

});

// this is the route we could use to get data as a form input from schools.pug if we wanted to send it discreetly with a singular '/teams' route using HTTP POST
// However, using the request params is better than the body because it allows users to bookmark pages without having to renavigate to the website start point to re-reach this route
// The better option will be implemented below using HTTP GET rather than POST. This method just serves as an example but we will not actually use it
router.route('/teams').post((req, res) => {

    // retrieve the client's input from the request body. the req.body.sport is set in a commented out section of the teams.pug file that uses a form and HTTP POST to reach this route. The form input has a name attribute 'name="sportSchool"' 
    let sportSchool = req.body.sport;
    // split the client's input we found in the body into distinct parts surrounding the @ symbol since we really got 4 separate pieces of data from 1 string of input
    let result = sportSchool.split('@');

    // assign to different parts of the split string to its appropriate variable
    let sport = result[0];
    let school = result[1];
    let city = result[2];
    let state = result[3];

    // If we were to continue, we could use these variables to query data from the database for the next page we wanted to render


});

// This is the better option than the one above that. This technique takes the url parameters from the GET request to populate our variables
// The parameters are '/:sport' and '/:school'. This means that both of these are variable routes that the user could take based on input. An example route could be localhost:3000/teams/basketball/St.%20Louis%20University. %20 is a space character indicator in a url
// We can grab both the params from above such that req.params.sport == basketball, and req.params.school == St. Louis University
// This route shows all the teams for the selected sport at the selected school. So this would show all the basketball teams at SLU (2 teams men's and women's)
router.route('/teams/:sport/:school').get((req, res) => {

    // get the sport and school from the url parameters we defined in the route
    let sport = req.params.sport;
    let school = req.params.school;

    // find all the teams that play the chosen sport at the chosen school. Continuing the example, find all the basketball teams at SLU
    teamSchema.find( {sport: sport, school: school} )

        // if the promise is resolved, render teams.pug and set the variables for that pug file
        // 'teams' == the array of teams returned by our find() query above
        .then(teams => {
            res.render('teams', {
                // capitalize the sport name just for a nice looking display on the web page
                sport: capitalize(sport),
                school: school,
                teams: teams
            })
        })
        .catch(err => res.json(`Failed to find ${sport} teams at ${school}: ${err}`));


});

// This route shows the schedule for the selected teams using the same route parameters as above to transfer data
router.route('/schedule/:sport/:team/:school').get((req, res) => {

    // get the data from the request parameters (url)
    let team = req.params.team;
    let school = req.params.school;
    // lowercase the sport since this is the same value as the sport we uppercased() previously
    let sport = lowercase(req.params.sport);
 
    // perform a search query to find the single team for the user inputted sport, school, and team. Return the schedule for that team
    teamSchema.findOne( {sport: sport, school: school, team: team}, {_id: 0, schedule: 1} )
    
        // 'schedule' is the return of the findOne() performed above
        .then(schedule => {

            // render schedule.pug and set the variables of scheule.pug
            res.render('schedule', {
                team: team,
                schedule: schedule,
                // set the months variable in the pug file to an array of months so that we can display them in a string format
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                // set the convertHours() function in the pug file to the folowing function that converts miltary time to twelve hour time
                convertHours: (hour) => {
                    if (hour == 0 || hour == 12) { return "12" }
                    else if (hour == 1 || hour == 13) { return "1" }
                    else if (hour == 2 || hour == 14) { return "2" }
                    else if (hour == 3 || hour == 15) { return "3" }
                    else if (hour == 4 || hour == 16) { return "4" }
                    else if (hour == 5 || hour == 17) { return "5" }
                    else if (hour == 6 || hour == 18) { return "6" }
                    else if (hour == 7 || hour == 19) { return "7" }
                    else if (hour == 8 || hour == 20) { return "8" }
                    else if (hour == 9 || hour == 21) { return "9" }
                    else if (hour == 10 || hour == 22) { return "10" }
                    else if (hour == 11 || hour == 23) { return "11" }
                }

            });
        })

});

// Export the router so we can use it in the main application start point, app.js
module.exports = router;