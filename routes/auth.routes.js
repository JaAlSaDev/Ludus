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
    res.json({ message: "unable to register" }).status(400);
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

router.get("/user", isLoggedIn, async (req, res) => {
  console.log(req.user);

  try {
    let user = await User.findById(req.user.id, "-password");

    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/updateUser", isLoggedIn, async (req, res) => {
  console.log(req.body);

  try {
    let user= await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
    
    if (!user) throw err;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "something went wrong!" });
  }
});

module.exports = router;