const userSeedData = [
  {
    username: "sally_smith",
    email: "sally@example.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "claire_martin",
    email: "claire@example.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "chloe_fall",
    email: "chloe@example.com",
    thoughts: [],
    friends: [],
  },
]

const thoughtSeedData = [
  {
    thoughtText: "First thought",
    username: "sally_smith",
    reactions: [],
  },
  {
    thoughtText: "I wonder....",
    username: "claire_martin",
    reactions: [],
  },
  {
    thoughtText: "That's interesting",
    username: "chloe_fall",
    reactions: [],
  },
]

const reactionSeedData = [
  {
    reactionBody: "Cool!",
    username: "sally_smith",
  },
  {
    reactionBody: "Love!",
    username: "claire_martin",
  },
  {
    reactionBody: "Wow!",
    username: "chloe_fall",
  },
]


module.exports = {
  userSeedData,
  thoughtSeedData,
  reactionSeedData,
};





