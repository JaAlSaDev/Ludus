const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../config/config");
require("dotenv").config();

router.post("/register", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  try {
    let user = new User({ first_name, last_name, email, password });

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({ user }).status(200);
  } catch (err) {
    res.json({ message: err }).status(400);
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" }).status(400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Incorrect password!" }).status(400);
    }

    console.log(user);
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;

        res.json({ token }).status(200);
      }
    );

    // res.json({ message: payload }).status(200);
  } catch (err) {
    res.json({ message: "You are not loggedin!" }).status(200);
  }
});

router.get("/user", async (req, res) => {
  console.log(req.body.user);

  try {
    let user = await User.findById(req.body.user.id, "-password").populate({
      path: "FriendsList.friendID",
      select: "first_name last_name",
    });;

    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/updateUser", isLoggedIn, async (req, res) => {
  console.log(req.body);

  try {
    let user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.get("/search", async (req, res) => {
  console.log(req.body);

  let { first_name } = req.body;

  try {
    let users = await User.find(
      { first_name: { $regex: first_name, $options: "i" }},
      "first_name last_name"
    );

    if (!users) throw err;

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/addFriend", async (req, res) => {
  console.log(req.body);

  let { senderId, recieverId } = req.body;
  let senderFriendObj = {
    friendID: recieverId,
    role: "reciever",
  };

  let recieverFriendObj = {
    friendID: senderId,
    role: "sender",
  };

  try {
    let sender = await User.findByIdAndUpdate(
      senderId,
      { $push: { FriendsList: senderFriendObj } },
      { new: true }
    );

    let reciever = await User.findByIdAndUpdate(
      recieverId,
      { $push: { FriendsList: recieverFriendObj } },
      { new: true }
    );

    res.status(200).json({ sender, reciever });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "friends were not added" });
  }
});

router.put("/removeFriend", async (req, res) => {
  console.log(req.body);

  let { _id, friendID } = req.body;

  try {
    let user = await User.findByIdAndUpdate(
      _id,
      { $pull: { FriendsList: { friendID: friendID } } },
      { new: true }
    );

    let friend = await User.findByIdAndUpdate(
      friendID,
      { $pull: { FriendsList: { friendID: _id } } },
      { new: true }
    );

    res.status(200).json({ user, friend });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Deletion unsuccessful!" });
  }
});

router.put("/acceptFriend", async (req, res) => {
  console.log(req.body);

  let { recieverID, senderID } = req.body;

  try {
    let reciever = await User.update(
      { _id: recieverID, "FriendsList.friendID": senderID },
      { $set: { "FriendsList.$.isAccepted": true } },
      { new: true }
    );

    let sender = await User.update(
      { _id: senderID, "FriendsList.friendID": recieverID },
      { $set: { "FriendsList.$.isAccepted": true } },
      { new: true }
    );

    res.status(200).json({ reciever, sender });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Accept  unsuccessful!" });
  }
});



module.exports = router;
