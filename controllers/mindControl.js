const { user, thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const newThought = await thought.create(req.body)
        await user.findOneAndUpdate(
            { username: newThought.username },
            { //$addToSet
                $push: { thoughts: newThought } }
        )
        if (!newThought) {
          res.status(404).json({ message: 'No user with this username!' })
        } else {
          res.json(newThought)
        }
      },
 //       .then((thought) => res.json(thought))
   //     .catch((err) => {console.log(err)
     //   return res.status(500).json(err)
    //     })
    // },

    getAllThoughts(req, res) {
        thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        thought.findOne({_id: req.params.thoughtId})
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
        console.log(req.params.reactionId);
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionID: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'Reaction not found' })
            } else { 
                res.json('Reaction removed') 
            }
        })
        .catch((err) => res.status(500).json(err));
    }
}