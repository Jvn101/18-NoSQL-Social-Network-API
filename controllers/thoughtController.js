const { Thought, User } = require("../models");
//const { ObjectId } = require('mongoose').Types;

const thoughtController = {
  getAllThought(req, res) {
    console.log("HELLLOOOO!!!!!!!")
    res.json("test")
    // Thought.find({})
    //   .select("-__v")
    //   .then((dbThoughtData) => res.json(dbThoughtData))
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(400).json(err);
    //   });f
  },

  getThoughts : async(req, res) => {
    console.log("HELLLOOOO!!!!!!!")
    try{
        const thought = await Thought.find()
        res.json(thought)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err); 
    }
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
        res.status(400);
      });
  },

  // create Thought
  createThought(req, res) {
   Thought.create(req.body)
    .then(thought => 
        User.findOneAndUpdate(
            { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
        )
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this username" });
        }
        res.json({ message: "Thought created!" });
      })
      .catch((err) => res.json(err));
  },

  // update Thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
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

        // remove thought id from user's thoughts
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
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
  deleteReaction(req, res) {
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
