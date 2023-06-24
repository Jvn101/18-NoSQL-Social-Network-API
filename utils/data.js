const userSeedData = [
  {
    username: "sally_smith",
    email: "sally@example.com",
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
]

const reactionSeedData = [
  {
    reactionBody: "Cool!",
    username: "sally_smith",
  },
]


module.exports = {
  userSeedData,
  thoughtSeedData,
  reactionSeedData,
};





