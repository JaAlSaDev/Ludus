const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({


    name : {
      type : String,
      required : true
    },
    userName : {
      type : String,
      unique: true,
      required : true
    },
    email : {
      type : String,
      unique: true,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    profilePic : {
      type : String,
      required : true
    },
      FriendsList: [
      {
        friendID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["reciever", "sender"],
          required: true,
        },
        isAccepted: {
          type: Boolean,
          default: false,
        },
      },
    ],                                 
    dateOfBirth : Date,
    nationality : String,
    aboutMe : String,
    languages : String
}, 
{timestamps : true}
)

const User = mongoose.model('User', userSchema)
module.exports = User
