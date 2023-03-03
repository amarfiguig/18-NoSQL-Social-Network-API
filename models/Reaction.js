// Import Mongoose library
const mongoose = require('mongoose');

// Define Reaction schema using Mongoose.Schema
const reactionSchema = new mongoose.Schema({
  // Define reactionId field with a default value of a new ObjectID
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => mongoose.Types.ObjectId(),
  },
  // Define reactionBody field as a required string with a maximum length of 280 characters
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // Define username field as a required string
  username: {
    type: String,
    required: true,
  },
  // Define createdAt field as a Date with a default value of the current time and a custom getter function to format the date as a string
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => createdAt.toLocaleString(),
  },
});

// Set options for the toJSON method of the schema, including removing the _id and id fields from the returned object
reactionSchema.set('toJSON', {
  getters: true,
  virtuals: false,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
  },
});

// Export the Reaction model using the reactionSchema
module.exports = mongoose.model('Reaction', reactionSchema);
