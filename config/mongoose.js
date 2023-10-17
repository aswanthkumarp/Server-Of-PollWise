require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

// Use environment variables to construct the MongoDB connection URI
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster79.klv3hpy.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log('You have successfully connected to MongoDB!');
  } catch (e) {
    console.log('Connection to MongoDB failed.');
    throw new Error('Mongo Connection');
  }
}

module.exports = run;
