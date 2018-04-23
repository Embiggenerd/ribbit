const mongoose = require('mongoose')
const { Schema } = mongoose

const followingSchema = new Schema({
  displayName: { type: String, required: true}
  _user: { type: Schema.ObjectId, required: true }
})

module.exports = followingSchema
