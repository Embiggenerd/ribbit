const mongoose = require("mongoose")
const { Schema } = mongoose
const commentSchema = require("./Comment")


// const commentSchema = new Schema({
//   text: { type: String, required: [true, "Got nothing to say?"] },
//   author: { type: Schema.ObjectId, ref: "users" },
//   dateCreated: { type: Date, default: Date.now() }
// })

const blogSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  pos: { type: Number, default: 0 },
  neg: { type: Number, default: 0 },
  _user: { type: Schema.ObjectId, ref: 'users'},
  _userDisplayName: { type: String, required: true},
  dateSent: Date,
  lastResponded: Date
})

// blogSchema.statics.postComment = function(blogID, text, author, cb) {
//   const BlogModel = mongoose.model("blog")
//   const CommentModel = mongoose.model("comment")
//   const commentModel = new Comment()
//   commentModel.author = author
//   commentModel.text = text
//
//   BlogModel.findOne({ _id: blogID }, function(err, blogInfo) {
//     // blogInfo is the blog found by findOne
//     if (err) {
//       cb({
//         retStatus: "failure",
//         message: "Blog commenting fail."
//       })
//     } else {
//       if (blogInfo) {
//         blogInfo.comments.push(commentModel)
//         blogInfo.save(function(err) {})
//         cb({
//           retStatus: "success",
//           message: "Comment saved"
//         })
//       } else {
//         cb({
//           retStatus: "failure",
//           message: "Blog not found"
//         })
//       }
//     }
//   })
// }

//const blog = mongoose.model("blog", blogSchema)
module.exports = mongoose.model('blog', blogSchema);
