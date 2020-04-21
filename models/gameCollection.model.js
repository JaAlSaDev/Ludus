const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameCollectionSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Name: {
      type: String,
      required: true,
      lowercase: true,
    },
    Description: String,
    GameIDs: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const GameCollection = mongoose.model("GameCollection", gameCollectionSchema);
module.exports = GameCollection;
