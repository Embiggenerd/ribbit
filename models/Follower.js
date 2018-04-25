const mongoose = require('mongoose')
const { Schema } = mongoose

const followerSchema = new Schema({
  displayName: { type: String, required: true},
  _user: { type: Schema.ObjectId, required: true }
})

mongoose.model('followers', followerSchema)

module.exports = followerSchema
