const router = require('express').Router();
const {
  fetchAllUsers,
  fetchUserById,
  addNewUser,
  modifyUser,
  eraseUser,
  appendFriend,
  detachFriend
} = require('../../controllers/userController');

// /api/
router.route('/').get(fetchAllUsers).post(addNewUser);

// /api/users/:userId
router.route('/:userId').get(fetchUserById).put(modifyUser).delete(eraseUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(detachFriend).post(appendFriend);

module.exports = router;