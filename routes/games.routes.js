const router = require("express").Router();
const GameCollection = require("../models/gameCollection.model");

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
    let gameCollections=await GameCollection.find({userID});

    res.json({ message: gameCollections}).status(200);
  } catch (err) {
    res.json({ message: "Unable to return game collections" }).status(400);
  }
});

router.put("/editCollection", async (req, res) => {
  let { _id, Name, Description} = req.body;

  let edits={Name, Description}

  try {
    let editedCollection=await GameCollection.findByIdAndUpdate(_id, edits, {new: true});

    res.json({  editedCollection}).status(200);
  } catch (err) {
    res.json({ message: "Unable to edit the game collection" }).status(400);
  }
});

router.put("/editCollection/addGame", async (req, res) => {
  let {_id, gameID} = req.body;


  try {
    let editedCollection=await GameCollection.findByIdAndUpdate(_id, {$addToSet: {GameIDs: gameID}}, {new: true});

    res.json({  editedCollection}).status(200);
  } catch (err) {
    res.json({ message: "Unable to add game to the collection" }).status(400);
  }
});

router.put("/editCollection/removeGame", async (req, res) => {
  let {_id, gameID} = req.body;


  try {
    let editedCollection=await GameCollection.findByIdAndUpdate(_id, {$pull: {GameIDs: gameID}}, {new: true});

    res.json({  editedCollection}).status(200);
  } catch (err) {
    res.json({ message: "Unable to remove the game from the collection" }).status(400);
  }
});

module.exports = router;
