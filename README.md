# PollWise - Backend Server

Welcome to the backend repository for PollWise, a web polling application. The backend is responsible for managing the APIs, user authentication, and real-time updates for polling.

## Dependencies

- **Express:** Web framework for Node.js to create APIs and handle HTTP requests.
- **Mongoose:** MongoDB object modeling tool for Node.js to work with MongoDB.
- **Socket.IO:** Enables real-time, bidirectional, and event-based communication.
- **Cors:** Provides Express middleware for handling Cross-Origin Resource Sharing.
- **Dotenv:** Loads environment variables from a `.env` file to keep sensitive data secure.
- **JSONWebToken:** For generating and verifying JSON web tokens for user authentication.
- **Passport and Passport-JWT:** For authentication strategies using JWT tokens.

## Installation and Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server: `npm start` or `npm run dev` for development using Nodemon.

## Usage

1. Configure the `.env` file with necessary environment variables.
2. Start the server using `npm start`.
3. The server will be accessible at `localhost:5173` by default.

## APIs

This server provides the necessary APIs for user authentication, managing polls, and handling real-time updates for the PollWise web application.

## Frontend Repository

To view the frontend codebase for the PollWise application, [click here](https://github.com/aswanthkumarp/PollWise-V1.0).

---

