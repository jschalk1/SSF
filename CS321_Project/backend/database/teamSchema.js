// import mongoose for database management
const mongoose = require('mongoose')

// teanSchema describes the structure of documents in the teams collection
let teamSchema = new mongoose.Schema({

    school: { type: String, required: true},
    team: { type: String, required: true},
    sport: { type: String, required: true},
    schedule: [{
        date: {type: Date, require: true},
        opponent: {type: String, required: true},
        homeaway: {type: String, required: true}
    }]

});

// export the model so that we can use it to perform database operations for the given collection and document requirements
// The first argument of mongoose.model() is the singular version of the collection name. 'team' means use the 'teams' collection since this is just a single team model(schema)
// The second argument tells is the schema we created above which enforces the structure of each document in the teams collection
module.exports = mongoose.model('team', teamSchema);