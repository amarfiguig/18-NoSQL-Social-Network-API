// Import the `mongoose` package
const mongoose = require('mongoose');

// Define an asynchronous function `connectToDatabase()` that connects to a MongoDB database
async function connectToDatabase() {
  try {
    // Use `mongoose.connect()` to establish a connection to the MongoDB database at `mongodb://localhost/developersApplications`
    await mongoose.connect('mongodb://localhost:4000', {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new unified topology engine
    });
    // Log a success message to the console if the connection is established
    console.log('Connected to database');
  } catch (error) {
    // Log an error message to the console if the connection fails
    console.error(`Failed to connect to database: ${error.message}`);
  }
}

// Export the `connectToDatabase()` function so it can be used by other parts of the application
module.exports = connectToDatabase;
