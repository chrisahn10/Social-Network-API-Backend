const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReactions,
    removeReactions
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReactions);

// /api/thoughts/:thougtId/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;