const router = require("express").Router();
const GameCollection = require("../models/gameCollection.model");
require("dotenv").config();
const axios = require("axios").default;

router.post("/create", async (req, res) => {
  try {
    let gameCollection = new GameCollection(req.body);

    await gameCollection.save();

    res.json({ gameCollection }).status(200);
  } catch (err) {
    res.json({ message: "unable to create the game collection" }).status(400);
  }
});

router.delete("/delete", async (req, res) => {
  let { _id } = req.body;

  try {
    await GameCollection.findByIdAndDelete(_id);

    res.json({ message: "Collection deleted successfully!" }).status(200);
  } catch (err) {
    res.json({ message: "Unable to delete the game collection" }).status(400);
  }
});

router.get("/getCollections", async (req, res) => {
  let { userID } = req.body;

  try {
    let gameCollections = await GameCollection.find({ userID });

    res.json({ message: gameCollections }).status(200);
  } catch (err) {
    res.json({ message: "Unable to return game collections" }).status(400);
  }
});

router.put("/editCollection", async (req, res) => {
  let { _id, Name, Description } = req.body;

  let edits = { Name, Description };

  try {
    let editedCollection = await GameCollection.findByIdAndUpdate(_id, edits, {
      new: true,
    });

    res.json({ editedCollection }).status(200);
  } catch (err) {
    res.json({ message: "Unable to edit the game collection" }).status(400);
  }
});

router.put("/editCollection/addGame", async (req, res) => {
  let { _id, gameID } = req.body;

  try {
    let editedCollection = await GameCollection.findByIdAndUpdate(
      _id,
      { $addToSet: { GameIDs: gameID } },
      { new: true }
    );

    res.json({ editedCollection }).status(200);
  } catch (err) {
    res.json({ message: "Unable to add game to the collection" }).status(400);
  }
});

router.put("/editCollection/removeGame", async (req, res) => {
  let { _id, gameID } = req.body;

  try {
    let editedCollection = await GameCollection.findByIdAndUpdate(
      _id,
      { $pull: { GameIDs: gameID } },
      { new: true }
    );

    res.json({ editedCollection }).status(200);
  } catch (err) {
    res
      .json({ message: "Unable to remove the game from the collection" })
      .status(400);
  }
});

router.get("/getGameInfo/:gameID", async (req, res) => {
  let { gameID } = req.params;
  
  axios({
    url: "https://api-v3.igdb.com/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": `${process.env.REACT_APP_IGDB_Key}`,
    },
    data: `fields name, summary, cover.image_id, first_release_date, platforms.name, franchise.name, involved_companies.company.name, involved_companies.publisher, involved_companies.developer,game_modes.name, genres.name; where id = ${gameID};`,
  })
    .then((response) => {
      res.json(response.data[0]);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/search/:searchTerm", async (req, res) => {

  let {searchTerm} = req.params;
  axios({
    url: "https://api-v3.igdb.com/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": `${process.env.REACT_APP_IGDB_Key}`,
    },
    data: `search "${searchTerm}"; fields name, cover.image_id, first_release_date; limit 20; offset 0; where themes != (42);`,
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
