const mongoose = require("mongoose")
const { Schema } = mongoose
const commentSchema = require("./Comment")



const blogSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  ribs: { type: Number, default: 0 },
  _user: { type: Schema.ObjectId, ref: 'users', required: true},
  _userDisplayName: { type: String, required: true},
  dateSent: { type: Date, required: true },
  lastResponded:{ type: Date, required: false },
})


module.exports = mongoose.model('blog', blogSchema);
