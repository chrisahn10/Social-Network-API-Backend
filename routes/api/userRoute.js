const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriends,
  removeFriends
} = require('../../controllers/userController');

// /api/
router.route('/').get(getUsers).post(createUsers);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUsers).delete(deleteUsers);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriends).post(addFriends);

module.exports = router;