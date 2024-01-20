const router = require('express').Router();
const {
    GetAllThoughts,
    GetSingleThought,
    createThoughts,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(GetAllThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(GetSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thougtId/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;