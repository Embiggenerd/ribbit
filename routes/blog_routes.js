const _ = require("lodash")
const Path = require("path-parser")
const { URL } = require("url")
const mongoose = require("mongoose")
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/requireCredits")
const Mailer = require("../services/Mailer")
const Blogs = require("../models/Blog")
const Comment = require("../models/Comment")
const CommentMailer = require("../services/CommentMailer")
const User = require("../models/User")
const commentTemplate = require("../services/emailTemplates/commentTemplate")
const wrapAsync = require("../middlewares/asyncWrapper")
const boom = require("boom")

/*
No try/catch because wrapper takes care of it.
*/

module.exports = app => {
  app.get(
    "/api/blogs",
    requireLogin,
    wrapAsync(async (req, res) => {
      const blogs = await Blogs.find({ _user: req.user.id })
      res.send(blogs)
    })
  )

  app.get(
    "/api/blogs/:_user",
    requireLogin,
    wrapAsync(async (req, res) => {
      const { _user } = req.params
      const blogs = await Blogs.find({ _user })
      res.send(blogs)
    })
  )

  app.post(
    "/api/blogs",
    requireLogin,
    wrapAsync(async (req, res, next) => {
      // Properties on req.body sent from redux form.
      const { title, body } = req.body
      const { id, displayName } = req.user
      const blog = new Blogs({
        title,
        body,
        _user: req.user.id,
        _userDisplayName: req.user.displayName,
        dateSent: Date.now()
      })

      const savedBlog = await blog.save()
      res.send(savedBlog)
    })
  )

  app.get(
    "/api/blog/:blogid/detail",
    requireLogin,
    wrapAsync(async (req, res) => {
      const { blogid } = req.params
      const blog = await Blogs.findById(blogid)
      res.send(blog)
    })
  )

  app.post(
    "/api/comments/submit",
    requireLogin,
    wrapAsync(async (req, res) => {
      const { text, blogId } = req.body
      const { displayName, id } = req.user
      let comment = new Comment({
        text,
        _user: id,
        _userDisplayName: displayName,
        _blog: blogId,
        datePosted: Date.now()
      })
      const blog = await Blogs.findById(blogId)
      const blogsUser = await User.findById(blog._user)
      console.log("blogsUser:", blogsUser)
      const mailer = new CommentMailer(
        blogsUser,
        commentTemplate(comment, blogsUser)
      )
      comment = await comment.save()
      await mailer.send()
      res.send(comment)
    })
  )

  app.get(
    "/api/blog/:_blog/comments",
    requireLogin,
    wrapAsync(async (req, res) => {
      const { _blog } = req.params
      const comments = await Comment.find({ _blog })
      res.send(comments)
    })
  )

  app.get(
    "/api/users/:_user/comments",
    wrapAsync(async (req, res) => {
      const { _user } = req.params
      const comments = await Comment.find({ _user })
      res.send(comments)
    })
  )

  app.post(
    "/api/comments/:commentId/delete",
    requireLogin,
    wrapAsync(async (req, res) => {
      const comment = await Comment.findByIdAndRemove(req.params.commentId)
      res.send(comment)
    })
  )

  app.post(
    "/api/blogs/:blogId/delete",
    requireLogin,
    wrapAsync(async (req, res) => {
      const removedBlog = await Blogs.findByIdAndRemove(req.params.blogId)
      await Comment.remove({ _blog: removedBlog.id })
      res.send(removedBlog)
    })
  )

  app.post(
    "/api/blogs/:_id/rib",
    requireLogin,
    requireCredits,
    wrapAsync(async (req, res) => {
      const user = req.user
      user.credits -= 1
      const { _id } = req.params
      const blog = await Blogs.findById(_id).select("ribs")
      blog.ribs += 1
      const updatedUser = await user.save()
      const updatedBlog = await blog.save()
      res.send({
        ribs: updatedBlog.ribs,
        _id,
        credits: updatedUser.credits
      })
    })
  )
}
