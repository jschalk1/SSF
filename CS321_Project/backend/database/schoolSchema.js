// import mongoose for database management
const mongoose = require('mongoose')

// schoolSchema describes the structure of documents in the schools collection
let schoolSchema = new mongoose.Schema({
    school: { type: String, required: true },
    city: { type: String, required: true},
    state: { type: String, required: true},
    country: { type: String, required: true},
    level: { type: String, required: true},
    sports: { type: Array, required: true}
});

// export the model so that we can use it to perform database operations for the given collection and document requirements
// The first argument of mongoose.model() is the singular version of the collection name. 'school' means use the 'schools' collection since this is just a single school model(schema)
// The second argument tells is the schema we created above which enforces the structure of each document in the schools collection
module.exports = mongoose.model('school', schoolSchema);