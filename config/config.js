const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Aha!!  You are not allowed to view this!!!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userID = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Your token is invalid " });
  }
};
