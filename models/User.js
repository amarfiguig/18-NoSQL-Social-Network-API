// Import the Mongoose library
const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  // The username field is a string and is required, unique, and trimmed
  username: {
    type: String,
    required: [true, 'Please enter a username'], // Error message if username field is empty
    unique: true, // Each username must be unique
    trim: true // Remove any whitespace from the beginning or end of the username
  },
  // The email field is a string, is required, and must match a regex pattern for a valid email address
  email: {
    type: String,
    required: [true, 'Please enter an email address'], // Error message if email field is empty
    unique: true, // Each email must be unique
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email must match this regex pattern to be considered valid
  },
  // The thoughts field is an array of objectIds that reference the Thought model
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId, // The type is an objectId
      ref: 'Thought' // This field references the Thought model
    }
  ],
  // The friends field is an array of objectIds that reference the User model
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId, // The type is an objectId
      ref: 'User' // This field references the User model
    }
  ]
}, { timestamps: true }); // The schema options object includes a timestamps field that adds createdAt and updatedAt timestamps to the model

// Add a virtual field to the user schema to retrieve the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length; // The friendCount virtual field returns the length of the friends array field
});

// Create the user model with the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the user model so it can be used in other parts of the application
module.exports = User;
