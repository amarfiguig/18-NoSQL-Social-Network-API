// Import the express library
const express = require("express");

// Import the database connection from the config directory
const db = require("./config/connection");

// Import the routes module
const routes = require("./routes");

// Set the port number for the server to run on, default to 3001 if not specified in the environment
const PORT = process.env.PORT || 3001;

// Create an instance of the express application
const app = express();

// Set up middleware to parse request bodies as URL-encoded or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register the routes with the application
app.use(routes);

// Open a connection to the database and start the server on the specified port
db.once("open", () => {
app.listen(PORT, () => {
console.log(`API server port ${PORT}`);
  });
});
