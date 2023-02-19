const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getSingleThought,
    deleteThought,
    updateThought,
    removeReaction,
    addReaction
} = require('../../controllers/mindControl.js');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;