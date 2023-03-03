const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThought._id } },
          { new: true }
        );
      })
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Thought successfully created 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughId } },
              { new: true }
            )
      )
      .then((dbUser) =>
        !dbUser
          ? res
              .status(404)
              .json({ message: "Thought created but no user with this ID!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a thought reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this ID!" });
        }
        return res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a thought reaction
  removeReaction(req, res) {
const Thought = require('../models/Thought');

const thoughtController = {
  // Add video response
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reaction: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          // If the thought with the given ID does not exist, return a 404 error
          return res.status(404).json({ message: "No thought with this id!" });
        }
        // If the thought is successfully updated, return it in the response
        return res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Remove video response
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { userId: req.params.userId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
