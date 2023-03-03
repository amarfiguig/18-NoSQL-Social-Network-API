const { Thought, User } = require("../models");

const thoughtController = {
  //get all thoughts
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
  // get single thought by Id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new thought
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
  //Update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete Thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
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
              .json({ message: "Thought created but no user with this id!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a Thought reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
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
