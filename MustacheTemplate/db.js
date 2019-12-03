const mongoose = require('mongoose');

// Create an environment variable for the MongoDB password
const password = process.env.MONGO_PASSWORD;

// Create an account on MongoDB Atlas, create a cluster, get the URL you need to add below.
mongoose.connect(`mongodb+srv://USER:${password}@URL`);

module.exports = mongoose;

