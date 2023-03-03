const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "You must leave a thought"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [reactionSchema],
  },
  //This allows the JSON representation of the object to include the getters, but not the id.
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
