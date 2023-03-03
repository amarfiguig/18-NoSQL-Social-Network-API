// Import the User model
const { User } = require('../models');

// Define the userController object to hold all of the controller functions
const userController = {

  // Controller function to get all users
  getAllUsers(req, res) {
    User.find({})
      // Populate the thoughts field for each user
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      // Populate the friends field for each user
      .populate({
        path: 'friends',
        select: '-__v'
      })
      // Exclude the __v field from the response
      .select('-__v')
      // Sort the results by _id in descending order
      .sort({ _id: -1 })
      // Send the response as JSON
      .then(dbUserData => res.json(dbUserData))
      // Handle errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Controller function to get a user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // Populate the thoughts field for the user
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      // Populate the friends field for the user
      .populate({
        path: 'friends',
        select: '-__v'
      })
      // Exclude the __v field from the response
      .select('-__v')
      // Return an error if no user is found
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        // Send the response as JSON
        res.json(dbUserData);
      })
      // Handle errors
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Controller function to create a new user
  createUser({ body }, res) {
    User.create(body)
      // Send the new user data as JSON
      .then(dbUserData => res.json(dbUserData))
      // Handle errors
      .catch(err => res.status(400).json(err));
  },

  // Controller function to update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      // Return an error if no user is found
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        // Send the updated user data as JSON
        res.json(dbUserData);
      })
      // Handle errors
      .catch(err => res.status(400).json(err));
  },

  // Controller function to add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      // Populate the friends field for the user
      .populate({
        path: 'friends',
        select: ('-__v')
      })
      // Exclude the __v field from the response
      .select('-__v')
      // Return an error if no user is found
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User
 // Deleting friend from friend's list 
  deleteFriend: async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const dbUserData = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { friends: friendId } },
        { new: true }
      )
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v');
      
      if (!dbUserData) {
        return res.status(404).json({ message: 'No User found with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

// Exporting controller 
module.exports = userController;
