const { user, thought } = require('../models');

module.exports = {

    createThought(req, res) {
        thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {console.log(err)
        return res.status(500).json(err)
        })
    },

    getAllThoughts(req, res) {
        thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        thought.findOne({_id: req.params.userId})
        .select('-__v')
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'thought not found'})
            } else {
                res.json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'thought not found'})
             } else {
                user.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                  )
            }
        })
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'thought not found' })
            } else { 
                res.json(thought) }
            })
        .catch((err) => res.status(500).json(err))
    },

    addReaction(req, res) {
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
        .then((thought) => {
        if (!thought) {
            res.status(404).json({ message: 'thought not found' })
        } else { 
            res.json(thought) }
        })
    .catch((err) => res.status(500).json(err))
    },

    removeReaction(req, res) {
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'thought not found' })
            } else { 
                res.json(thought) 
            }
        })
        .catch((err) => res.status(500).json(err));
    }
}