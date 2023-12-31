const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removefromFriendList,
} = require("../../controllers/userController");

// api/users
router.route("/").get(getAllUsers).post(createUser);

// api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addToFriendList).delete(removefromFriendList);

module.exports = router;
