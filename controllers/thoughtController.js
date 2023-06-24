const { Thought, User } = require("../models");
const { ObjectId } = require('mongoose').Types;

const thoughtController = {
  // get all Thoughts
  getAllThought(req, res) {
    Thought.find({})
    //   .populate({
    //     path: "reactions",
    //     select: "-__v",
    //   })
      .select("-__v")
    //   .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this ID" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create Thought
  createThought({ body }, res) {
    Thought.create(body)
    //   .then(({ _id }) => {
    //     return User.findOneAndUpdate(
    //       { _id: body.userId },
    //       { $push: { thoughts: _id } },
    //       { new: true }
    //     );
    //   })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this ID" });
        }
        res.json({ message: "Thought created!" });
      })
      .catch((err) => res.json(err));
  },

  // update Thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
        {
            $set: req.body,
          },
          {
            new: true,
            runValidators: true,
          }
        )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this ID" });
        }

        // remove thought id from user's `thoughts` field
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }, //$pull removes from an existing values that match a specified condition.
          { new: true }
        );
      })
      .then(() => {
        // if (!dbUserData) {
        //   return res
        //     .status(404)
        //     .json({ message: "Thought created but no user with this id!" });
        // }
        res.json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => res.json(err));
  },

  // add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.params.reactionId } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;