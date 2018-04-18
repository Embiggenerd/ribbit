const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
  googleID: String,
  credits: {type: Number, default: 0},
  email: {type: String, required: true},
  displayName: {type:String, required: true}
})



module.exports = mongoose.model('users', userSchema)
