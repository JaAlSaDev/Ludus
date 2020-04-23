
const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
require("dotenv").config();
//const isLoggedIn = require("../config/config");
//require("dotenv").config();

// any route will start from user/...
router.post('/register', (req, res) => {
  
  const newUser = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.body.profilePic || gravatar.url(req.body.email, {protocol: 'https', s: '100'})

  }
  // res.send(newUser)
  User.findOne({ email: newUser.email })
    .then(user => {
      // if email is not registered in the DB
      if (!user) {

        bcrypt.hash(newUser.password, 10, (err, hash) => {

          newUser.password = hash
          User.create(newUser)
            .then(() => {
              let payload = { newUser }
              let token = jwt.sign(payload, "SECRET", { expiresIn: 1500 })
              res.json({ msg: 'user created', userInfo: newUser, token })})


        })
      } else {
        // if email is already on the DB
        res.send('Email has already been used!')
      }
    }).catch(err => res.json(err))
})


router.post('/login', (req, res) => {
  const userLogin = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({ email: userLogin.email })
    .then(user => {

      // if email exists
      if (user) {
        // if password is correct
        if (bcrypt.compareSync(userLogin.password, user.password)) {

          user.password = ""
          let payload = { user }
          let token = jwt.sign(payload, "SECRET", { expiresIn: 1500 })

          res.json({ token })

        } else {
          res.json({ msg: 'password is not correct' })
        }

      } else {
        res.json({ msg: 'Email is wrong' })
      }


    }).catch(err => res.json(err).status(200))
})

router.put("/showProfile", async (req, res) => {
  console.log(req.body);

  try {
    let user = await User.findById(req.body.userID, "-password").populate({
      path: "FriendsList.friendID",
      select: "name",
    });;
     
    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/updateUser", async (req, res) => {
  console.log(req.body);
  let {
    _id,
    password
  } = req.body
  delete req.body._id
  try {
    if(password !== ""){
      req.body.password = await bcrypt.hash(req.body.password, 10)
    } else {
      delete req.body.password
    }
    let user = await User.findByIdAndUpdate( _id, req.body, {
      new: true,
    });

    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/search", async (req, res) => {
  console.log(req.body);

  let  {searchTerm}  = req.body;

  console.log((req.body))
  try {
    let users = await User.find(
      { name: { $regex: searchTerm, $options: "i" }},
      "name profilePic"
    );

    if (!users) throw err;

    res.status(200).json({ users });
  } catch (error) {
    console.log(error)
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
