const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userSeedData, thoughtSeedData, } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // create users
  const users = await User.insertMany(userSeedData);

  //create thoughts
  const thoughts = await Thought.insertMany(thoughtSeedData);

  for (let i = 0; i < thoughts.length; i++) {
    // Add thoughts to user
    await User.findOneAndUpdate(
      { username: thoughts[i].username },
      { $push: { thoughts: thoughts[i]._id } },
      { new: true }
    );
    }

    console.table("Users seeded:", await User.find());
    console.table("Thoughts seeded:", await Thought.find());
    console.info("Seeding complete! 🌱");
    process.exit(0);
  });
    