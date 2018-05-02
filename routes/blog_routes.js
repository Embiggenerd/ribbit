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
    const blogs = await Blogs.find({ _user: req.user.id }).select({
      comments: false
    })
    //  console.log("Found blogs: ", blogs)
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
  //  console.log("Found blogs: ", blogs)

  app.post("/api/blogs", requireLogin, async (req, res) => {
    // Properties on req.body sent from redux form.
    // Notice recipients formatted so
    const { title, subject, body, mentions } = req.body
    const blog = new Blogs({
      title,
      subject,
      body,
      mentions: mentions
        .split(",")
        .map(mention => ({ mention: mention.trim() })),
      _user: req.user.id,
      _userDisplayName: req.user.displayName,
      dateSent: Date.now()
    })
    //console.log("survey model instance created in api/blogs route: ", Blogs)

    try {
      const savedBlog = await blog.save()
      res.send(savedBlog)
    } catch (error) {
      res.status(422).send(err)
    }
  })

  // app.post('/api/blog/comment', requireLogin, requireCredits, async (req, res) => {
  //   const { text, user, _id } = req.body
  //   Blogs.postComment(_id, text, user.id, function(data) {
  //     console.log("Blogs' postComment's cb param: ", data)
  //   })
  // })
  // app.get("/api/blogs/list", requireLogin, async (req, res) => {
  //   res.send({text:"hithere"})
  // })
  app.get("/api/blog/:blogid/detail", requireLogin, async (req, res) => {
    const { blogid } = req.params

    const blog = await Blogs.findById(blogid, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success)
      }
    })
    //console.log('blog detail req.params : ', req.params)

    //const blog = Blogs.findOne(_id: )
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
    // try {
    //   await mailer.send()
    //   comment = await comment.save()
    //   // req.user.credits -= 1
    //   // await req.user.save()
    //   res.send(comment)
    // } catch(error) {
    //   res.status(422).send(error)
    // }
  })

  app.get("/api/blog/:_blog/comments", requireLogin, async (req, res) => {
    const { _blog } = req.params
    const comments = await Comment.find({ _blog }, (error, success) => {
      if (error) {
        handleError(error)
      } else {
        //console.log(success)
        res.send(success)
      }
    })
    // try {
    //   const comments = await Comment.find({ _blog:blogId }, (error, success) => {
    //     if (error) {
    //       console.log(error)
    //     } else {
    //       console.log(success)
    //       res.send(success)
    //     }
    //   })
    // } catch(err) {
    //   res.status(422).send(err)
    // }
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
    // const removedBlog = await Blogs.findByIdAndRemove(req.params.blogId, (error, success) => {
    //   if(error) {
    //     console.log(error)
    //   } else {
    //     res.send(success)
    //     // Comment.remove({_user: }(error, success) => {
    //     //   if(error) {
    //     //     console.log(error)
    //     //   } else res.send()
    //     // })
    //   }
    // })
    //console.log("delete blogs router invoked, blogId = ", req.params.blogId)
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

  app.post('/api/blogs/:_id/rib', requireLogin, requireCredits, async (req, res) => {
    // try {
    //   console.log("req.user: ",req.user)
    // }catch(error){
    //   console.log(error)
    // }

    try {
      const user = await User.findById(req.user._id).select("credits")
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
    } catch(error) {
      console.log(error)
    }

  })
}
