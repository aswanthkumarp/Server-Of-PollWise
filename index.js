require('dotenv').config();

// Express
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000;

const db_connection = require('./config/mongoose');

app.use(cors());

// Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Socket connection
const pollResultServer = require('http').Server(app);
const pollResultSocket =
  require('./config/poll-results-socket').poll_result_socket(pollResultServer);
const socketPort = 4050;

pollResultServer.listen(socketPort, (err) => {
  if (err) {
    console.log('Error in starting server');
    return;
  }
  console.log(`Socket successfully listens on port ${socketPort}`);
});

// Passport
const passport = require('passport');
const jwt = require('./config/passport-jwt-strategy');

db_connection().then(() => {
  // Routes
  app.use('/', require('./routes'));   

  // Initialize Passport
  app.use(passport.initialize());

  // Server
  app.listen(port, function (err) {
    if (err) {
      console.log(`Server failed to start. Error encountered: ${err}`);
      return;
    }

    console.log('Server started successfully on Port:', port);
  });
});
