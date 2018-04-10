const mongoose = require("mongoose")
const { Schema } = mongoose

const commentSchema = new Schema({
  text: { type: String, required: true },
  _user: { type: Schema.ObjectId, ref: "users", required: true },
  _blog: { type: Schema.ObjectId, ref: "blog", required: true },
  neg: { type: Number, default: 0 },
  datePosted: Date
})

module.exports = mongoose.model("comment", commentSchema)
