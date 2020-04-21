// Environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;


//connect mongodb
//=================
require("./config/db");

//Middleware section
{
  //tells express to look in public for static files
  app.use(express.static("public"));

  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(express.json());

  //Use the routes here
  app.use("/api/auth/", require("./routes/auth.routes"));
  app.use("/api/gameCollection/", require("./routes/games.routes"));

  // 404 Routes
  //===================
  app.get("*", (req, res) =>
    res.json({ error: "Are you lost?", status: 404 }).status(404)
  );
}

app.listen(PORT, () => console.log(`Express running on ${PORT}`));
