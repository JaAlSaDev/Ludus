// Environment variables
require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

//connect mongodb
//=================
require("./config/db");

//Middleware section
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("build"));
app.use(express.static(path.join(__dirname, "build")));
//tells express to look in public for static files

// any route will start from user/...
app.use("/user", require("./routes/auth.routes"));
app.use("/gameCollection", require("./routes/games.routes"));
app.get("*", (req, res) =>
  res.json({ error: "Are you lost?", status: 404 }).status(404)
);


app.get("/*", (req, res) =>{
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.listen(PORT, () => console.log(`Express running on ${PORT}`));
