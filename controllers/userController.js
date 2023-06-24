 const { User } = require("../models");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //get one user by id
  getUserById(req, res) {
    User.findOne({
      _id: req.params.userId,
    })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this ID" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message: "No user found with this ID.",
          });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({
      _id: params.UserId,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message: "No user found with this id.",
          });
        }
        return Thought.deleteMany({
          _id: { $in: dbUserData.thoughts },
        });
      })
      .then(() => {
        res.json({
          message: "User deleted successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //add friends
  addToFriendList(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: {
          friends: req.params.friendId,
        },
      },
      {
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message: "No user found with this id!",
          });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  //delete friend
  removefromFriendList(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: { friends: req.params.friendId },
      },
      {
        new: true,
      }
    )
      .then((deletedFriend) => {
        if (!deletedFriend) {
          return res.status(404).json({
            message: "No friend found with this id.",
          });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
