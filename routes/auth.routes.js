const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();
let tokenDuration = process.env.TokenDuration;
const isLoggedIn = require("../config/config");

// any route will start from user/...
router.post("/register", async (req, res) => {
  const newUser = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    profilePic:
      req.body.profilePic ||
      gravatar.url(req.body.email, { protocol: "https", s: "100" }),
  };

  try {
    let user = new User(newUser);
    user.password = await bcrypt.hash(newUser.password, 10);
    let userSaved = await user.save();

    let payload = { newUser: userSaved };

    let token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: tokenDuration,
    });
    res.status(201).json({ msg: "user created", userInfo: user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to register" });
  }
});

router.post("/login", (req, res) => {
  const userLogin = {
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({ email: userLogin.email })
    .then((user) => {
      // if email exists
      if (user) {
        // if password is correct
        if (bcrypt.compareSync(userLogin.password, user.password)) {
          user.password = "";
          let payload = { newUser: user };
          let token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: tokenDuration,
          });

          res.status(200).json({ token });
        } else {
          res.status(400).json({ msg: "password is not correct" });
        }
      } else {
        res.status(400).json({ msg: "Email is wrong" });
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/showProfile/:userName", async (req, res) => {
  console.log(req.body);

  try {
    let user = await User.findOne(
      { userName: req.params.userName },
      "-password"
    ).populate({
      path: "FriendsList.friendID",
      select: "name",
      model: "User",
    });

    if (!user) throw err;
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong!", error });
  }
});

router.put("/updateUser", isLoggedIn, async (req, res) => {
  console.log("body: ",req.body);
  // console.log("token",req.user);

  try {
    // let user = await User.findById(req.user._id);
    if (!user) throw error;

    if (req.body.password !== "") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete req.body.password;
    }
    user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    // if (!user) throw error;

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/search", async (req, res) => {
  console.log(req.body);

  let { searchTerm } = req.body;

  console.log(req.body);
  try {
    let users = await User.find(
      { name: { $regex: searchTerm, $options: "i" } },
      "name profilePic userName"
    );

    if (!users) throw err;

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.put("/addFriend", async (req, res) => {
  console.log(req.body);

  let { senderId, recieverId } = req.body;
  let senderFriendObj = {
    friendID: recieverId,
    role: "reciever",
    check: true,
  };

  let recieverFriendObj = {
    friendID: senderId,
    role: "sender",
    check: true,
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
