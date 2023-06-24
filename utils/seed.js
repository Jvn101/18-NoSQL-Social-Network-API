const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userSeedData, thoughtSeedData, reactionSeedData } = require("./data");

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
// Assign friend to user
    // //friends
    // for (let i = 0; i < users.length; i++) {
    //   // const randomFriends = Math.floor(Math.random() * 3);
    //   // Add friend to user
    //   await User.findOneAndUpdate(
    //     { _id: FriendId },
    //       { $push: { friends: userId } },
    //       { new: true }
    //   );
    //   }

    // for (let i = 0; i < users.length; i++) {
    //   // Get friends to add
    //   const friendAmount = Math.floor(Math.random() * 4) + 1;

    //   // Get random user
    //   const friends = [];
    //   for (let j = 0; j < friendAmount; j++) {
    //     let friend = users[Math.floor(Math.random() * users.length)];

    //     friends.push(friend._id);
    //   }
    // }

    // await User.findByIdAndUpdate(users._id, { friends: friendId });


    console.table("Users seeded:", await User.find());
    console.table("Thoughts seeded:", await Thought.find());
    console.info("Seeding complete! 🌱");
    process.exit(0);
  });
    

  // // Create empty array to hold the students
  // const students = [];

  // // Loop 20 times -- add students to the students array
  // for (let i = 0; i < 20; i++) {
  //   // Get some random assignment objects using a helper function that we imported from ./data
  //   const assignments = getRandomAssignments(20);

  //   const fullName = getRandomName();
  //   const first = fullName.split(" ")[0];
  //   const last = fullName.split(" ")[1];
  //   const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

  //   students.push({
  //     first,
  //     last,
  //     github,
  //     assignments,
  //   });
  // }

  // // Add students to the collection and await the results
  // await Student.collection.insertMany(students);

  // // Add courses to the collection and await the results
  // await Course.collection.insertOne({
  //   courseName: "UCLA",
  //   inPerson: false,
  //   students: [...students],
  // });

  // Log out the seed data to indicate what should appear in the database

