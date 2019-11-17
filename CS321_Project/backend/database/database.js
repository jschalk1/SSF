// use mongoose to issue database commands
let mongoose = require('mongoose');

// import the two schemas so we can insert dummy data into their collections
const teamSchema = require('./teamSchema');
const schoolSchema = require('./schoolSchema');

// db server
let uri = 'mongodb://localhost:27017';
// db name
let db = '/schedules';

// we make a class so that we can use the singleton method to always return the same instantiation of the database when we export the class intance at the bottom of the file
class Database {

    // connects
    connect () {
        // connect to the database at the uri with the name schedules
        // connect() is a built in mongoose function that connects to db, it returns a promise
        // the second parameter in the braces just ensures updated versions of stuff are used
        mongoose.connect(uri + db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

            // if the promise is resolved, print the succes message
            .then(() => {
                console.log("Connected to db server");
            })
            // if the promise is rejected, print the fail message
            .catch(() => {
                console.log("Failed to connect to db");
            })
    }

    // This method creates some dummy data for our 2 collections everytime we start the server
    setup() {

        // create some dummy teams data
        let teams = [
            
            {
                school: "Southern Illinois University Edwardsville",
                team: "SIUE Men's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-25T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-26T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-27T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "St. Louis University",
                team: "SLU Men's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-06T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-07T04:23:59.052Z",
                        "opponent": "Washington University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "St. Louis University",
                team: "SLU Women's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-06T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-08T02:22:49.052Z",
                        "opponent": "Washington University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "St. Louis University",
                team: "SLU Baseball",
                sport: "baseball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Washington University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "St. Louis University",
                team: "SLU Soccer",
                sport: "soccer",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Washington University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "Washington University",
                team: "Wash U Men's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "St. Louis University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "Washington University",
                team: "Wash U Women's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "St. Louis University",
                        "homeaway": "away"
                    }
                ]
            },

            {
                school: "Webster University",
                team: "Webster Men's Basketball",
                sport: "basketball",
                schedule: [
                    {
                        "date": "2019-11-28T02:22:49.052Z",
                        "opponent": "Murray State University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-11-29T02:22:49.052Z",
                        "opponent": "Southern Illinois University Carbondale",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-11-30T02:22:49.052Z",
                        "opponent": "Eastern Illinois University",
                        "homeaway": "away"
                    }, 
                    {
                        "date": "2019-12-02T02:22:49.052Z",
                        "opponent": "Northern Illinois University",
                        "homeaway": "away"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Webster University",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": " University of Missouri",
                        "homeaway": "home"
                    },
                    {
                        "date": "2019-12-05T02:22:49.052Z",
                        "opponent": "Washington University",
                        "homeaway": "away"
                    }
                ]
            },


        ]

        // create some dummy schools data
        let schools = [
            {
                school: "Southern Illinois University Edwardsville",
                city: "Edwardsville",
                state: "IL",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "football",
                    "soccer",
                    "tennis"
                ]
            },

            {
                school: "St. Louis University",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "football",
                    "soccer",
                    "tennis",
                    "hockey",
                    "lacrosse"
                ]
            },

            {
                school: "Webster University",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "football",
                    "soccer",
                    "golf"
                ]
            },

            {
                school: "Washington University",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "soccer",
                    "hockey",
                    "track"
                ]
            },

            {
                school: "Missouri Baptist University",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "football",
                    "soccer",
                    "tennis",
                    "hockey"
                ]
            },

            {
                school: "St. Louis Community College",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "soccer"
                ]
            },

            {
                school: "University of Missouri",
                city: "St. Louis",
                state: "MO",
                country: "USA",
                level: "college",
                sports: [
                    "baseball",
                    "basketball",
                    "soccer",
                    "golf"
                ]
            },

        ]

        // drop the schools collection if it exists so we don't insert a ton of duplicates
        schoolSchema.collection.drop()
            .then(() => console.log("Succesfully dropped school collection"))
            .catch(err => console.log("School collection didn't exist yet " + err));

        // insert all the dummy schools we made
        schoolSchema.insertMany(schools)
            .then(() => console.log('Schools inserted on startup'))
            .catch(err => console.log('Failed to create initial insert' + err));

        // drop the teams collection if it exists so we don't insert a ton of duplicates
        teamSchema.collection.drop()
            .then(() => console.log("Succesfully dropped team collection"))
            .catch(err => console.log("Team collection didn't exist yet " + err));

        // insert all the dummy teams we made
        teamSchema.insertMany(teams)
            .then(() => console.log('Teams inserted on startup'))
            .catch(err => console.log('Failed to create initial insert' + err));
    }

}

// export the database connection so other files can use it
// when another file requires this file, a database connection will automatically be established
module.exports = new Database();