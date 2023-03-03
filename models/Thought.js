// Import Mongoose Schema and Model
const { Schema, model } = require('mongoose');

// Reaction class constructor
class Reaction {
  constructor({ reactionBody, username }) {
    this.reactionBody = reactionBody;
    this.username = username;
    this.createdAt = Date.now();
  }
}

// Thought class constructor
class Thought {
  constructor({ thoughtText, username, reactions = [] }) {
    this.thoughtText = thoughtText;
    this.username = username;
    this.createdAt = Date.now();
    // Map through reactions array and create a new Reaction object for each reaction
    this.reactions = reactions.map(reaction => new Reaction(reaction));
  }

  // Getter to get the length of the reactions array
  get reactionCount() {
    return this.reactions.length;
  }
}

// Define thoughtSchema using Mongoose Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a thought',
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Format createdAt timestamp into a string
    get: timestamp => timestamp.toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [new Schema({
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Format createdAt timestamp into a string
      get: timestamp => timestamp.toLocaleString(),
    },
  }, { _id: false })]
}, { 
  // Include getters and virtuals when converting to JSON
  toJSON: { getters: true, virtuals: true },
  // Exclude the _id field from the schema
  id: false 
});

// Virtual getter to get the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});

// Create a new Mongoose model named "Thought" based on the thoughtSchema
const ThoughtModel = model('Thought', thoughtSchema);

// Export the Thought class
module.exports = Thought;
