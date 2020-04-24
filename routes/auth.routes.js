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

    let payload = { _id: userSaved._id, userName: userSaved.userName };

    let token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: tokenDuration,
    });
    res.status(201).json({ msg: "user created", userInfo: user, token });
  } catch (error) {
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

          let payload = { _id: user._id, userName: user.userName };
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
  try {
    let user = await User.findOne(
      { userName: req.params.userName },
      "-password"
    ).populate({
      path: "FriendsList.friendID",
      select: "name",
      model: "User",
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!", error });
  }
});

router.put("/updateUser", isLoggedIn, async (req, res) => {
  try {
    if (req.body.password !== "") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete req.body.password;
    }
    let user = await User.findByIdAndUpdate(req.userID, req.body, {
      new: true,
    });
    return res.status(200).json({ user });
  } catch (error) {
  
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/search", async (req, res) => {

  let { searchTerm } = req.body;
  try {
    let users = await User.find(
      { name: { $regex: searchTerm, $options: "i" } },
      "name profilePic userName"
    );

    if (!users) throw err;

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/addFriend", isLoggedIn, async (req, res) => {
  let { recieverId } = req.body;
  let senderFriendObj = {
    friendID: recieverId,
    role: "reciever",
    check: true,
  };

  let recieverFriendObj = {
    friendID: req.userID,
    role: "sender",
    check: true,
  };

  try {
    let sender = await User.findByIdAndUpdate(
      req.userID,
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
    res.status(400).json({ message: "friends were not added" });
  }
});

router.put("/removeFriend", isLoggedIn, async (req, res) => {
  let { friendID } = req.body;

  try {
    let user = await User.findByIdAndUpdate(
      req.userID,
      { $pull: { FriendsList: { friendID: friendID } } },
      { new: true }
    );

    let friend = await User.findByIdAndUpdate(
      friendID,
      { $pull: { FriendsList: { friendID: req.userID } } },
      { new: true }
    );

    res.status(200).json({ user, friend });
  } catch (error) {
    res.status(400).json({ message: "Deletion unsuccessful!" });
  }
});

router.put("/acceptFriend", isLoggedIn, async (req, res) => {

  let { senderID } = req.body;

  try {
    let reciever = await User.update(
      { _id: req.userID, "FriendsList.friendID": senderID },
      { $set: { "FriendsList.$.isAccepted": true } },
      { new: true }
    );

    let sender = await User.update(
      { _id: senderID, "FriendsList.friendID": req.userID },
      { $set: { "FriendsList.$.isAccepted": true } },
      { new: true }
    );

    res.status(200).json({ reciever, sender });
  } catch (error) {
    res.status(400).json({ message: "Accept  unsuccessful!" });
  }
});
module.exports = router;
