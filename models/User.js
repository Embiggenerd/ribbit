const mongoose = require("mongoose")
const followerSchema = require("./Follower")
const { Schema } = mongoose

const userSchema = new Schema({
  googleID: {type: String, required: true},
  credits: {type: Number, default: 0},
  email: {type: String, required: true},
  displayName: {type:String, required: true},
  followers: [followerSchema],
  following: [{type: Schema.ObjectId, ref: "users"}]
})



module.exports = mongoose.model('users', userSchema)
