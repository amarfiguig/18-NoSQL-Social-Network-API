const { Schema } = require("mongoose");
const { User, Thought } = require("../models");

const userController = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get single user by Id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => {
        !dbUser
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with this id!" })
          : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
      )
      .then((dbUserData) =>
        !dbUserData
          ? res
              .status(404)
              .json({ message: "User created but no user was found with this id!" })
          : res.json({ message: "User successfully deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(dbUser)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a user's friend
  addUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUser) => {
        !dbUser
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete a user's friend
  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        !dbUser
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
