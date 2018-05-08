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

module.exports = app => {
  app.get("/api/blogs", requireLogin, async (req, res) => {
    const blogs = await Blogs.find({ _user: req.user.id })
    res.send(blogs)
  })

  app.get("/api/blogs/:_user", requireLogin, async (req, res) => {
    const { _user } = req.params
    try {
      const blogs = await Blogs.find({ _user })
      res.send(blogs)
    } catch (error) {
      console.log(error)
    }
  })

  app.post("/api/blogs", requireLogin, async (req, res) => {
    // Properties on req.body sent from redux form.
    const { title, body } = req.body
    const blog = new Blogs({
      title,
      body,
      _user: req.user.id,
      _userDisplayName: req.user.displayName,
      dateSent: Date.now()
    })

    try {
      const savedBlog = await blog.save()
      res.send(savedBlog)
    } catch (error) {
      res.status(422).send(err)
    }
  })

  app.get("/api/blog/:blogid/detail", requireLogin, async (req, res) => {
    const { blogid } = req.params

    const blog = await Blogs.findById(blogid, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success)
      }
    })
  })

  app.post("/api/comments/submit", requireLogin, async (req, res) => {
    const { text, blogId } = req.body
    const { displayName, id } = req.user
    let comment = new Comment({
      text,
      _user: id,
      _userDisplayName: displayName,
      _blog: blogId,
      datePosted: Date.now()
    })
    Blogs.findById(blogId, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        User.findById(success._user, async (error, success) => {
          if (error) {
            console.log(error)
          } else {
            const mailer = new CommentMailer(
              success,
              commentTemplate(comment, success)
            )
            try {
              comment = await comment.save()
              await mailer.send()
              res.send(comment)
            } catch (error) {
              res.status(422).send(error)
            }
          }
        })
      }
    })
  })

  app.get("/api/blog/:_blog/comments", requireLogin, async (req, res) => {
    const { _blog } = req.params
    const comments = await Comment.find({ _blog }, (error, success) => {
      if (error) {
        handleError(error)
      } else {
        res.send(success)
      }
    })
  })
  app.get("/api/users/:_user/comments", async (req, res) => {
    const { _user } = req.params
    console.log("fetchUserComments router: ", _user)
    try {
      const comments = await Comment.find({ _user })
      res.send(comments)
    } catch (error) {
      console.log(error)
    }
  })

  app.post(
    "/api/comments/:commentId/delete",
    requireLogin,
    async (req, res) => {
      Comment.findByIdAndRemove(req.params.commentId, (error, success) => {
        if (error) {
          console.log(error)
        } else {
          res.send(success)
        }
      })
    }
  )
  app.post("/api/blogs/:blogId/delete", requireLogin, async (req, res) => {
    const removedBlog = Blogs.findByIdAndRemove(
      req.params.blogId,
      (error, success) => {
        if (error) {
          console.log(error)
        } else {
          res.send(success)
          console.log("the id of the removed blog: ", success._id)
          Comment.remove({ _blog: success.id }, (error, success) => {
            if (error) {
              console.log(error)
            } else {
              console.log("removed blog's comments removed: ", success)
            }
          })
        }
      }
    )
  })
  // Query user from req info to get most recent credit data.
  // Take away a credit from user.
  // Query blog by id, add rib to blog, rib and blog id data
  // back to be dispatched.

  app.post(
    "/api/blogs/:_id/rib",
    requireLogin,
    requireCredits,
    async (req, res) => {
      try {
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
      } catch (error) {
        console.log(error)
      }
    }
  )
}
