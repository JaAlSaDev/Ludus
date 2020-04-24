const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    FriendsList: [
      {
        friendID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
          default: null,
        },
        role: {
          type: String,
          enum: ["reciever", "sender"],
          required: true,
        },
        isAccepted: {
          type: Boolean,
          default: false,
        }
      },
<<<<<<< HEAD
    ],                                 
    dateOfBirth : Date,
    nationality : String,
    aboutMe : String,
    languages : String
}, 
{timestamps : true}
)
=======
    ],
    dateOfBirth: Date,
    nationality: {
      type: String,
      default: "",
    },
    aboutMe: {
      type: String,
      default: "",
    },
    languages: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
>>>>>>> AB_USER_FUNCs

const User = mongoose.model("User", userSchema);
module.exports = User;
