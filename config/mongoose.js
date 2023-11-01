require('dotenv').config();

const mongoose = require('mongoose');

// Use environment variables to construct the MongoDB connection URI
// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster79.klv3hpy.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017/PollWisev3';
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
