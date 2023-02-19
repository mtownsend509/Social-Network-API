const { user, thought } = require('../models');

module.exports = {

    createUser(req, res) {
        user.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {console.log(err)
        return res.status(500).json(err)
        })
    },

    getAllUsers(req, res) {
        user.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        user.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'user not found'})
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        user.findOneAndDelete({_id: req.params.userId})
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'user not found'})
            } else {
                thought.deleteMany({ _id: { $in: user.thoughts } })
            }
        })
        .then(() => res.json({ message: 'User and thoughtss deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        user.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: req.params.friendId } },
              { runValidators: true, new: true }
        )
        .then((user) =>
        !user
              ? res.status(404).json({ message: 'User not found' })
              : res.json(user)
        )
        .catch((err) => 
              res.status(500).json(err));
  },

    removeFriend(req, res) {
        user.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { runValidators: true, new: true }
        )
        .then((user) =>
        !user
              ? res.status(404).json({ message: 'User not found' })
              : res.json(user)
        )
        .catch((err) => 
              res.status(500).json(err));
  }
}