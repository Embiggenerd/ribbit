const _ = require("lodash")
const Path = require("path-parser")
const { URL } = require("url")
const mongoose = require("mongoose")
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/requireCredits")
const Mailer = require("../services/Mailer")
const Blogs = require("../models/Blog")
const Comment = require("../models/Comment")

module.exports = app => {
  app.get("/api/blogs", requireLogin, async (req, res) => {
    const blogs = await Blogs.find({ _user: req.user.id }).select({
      comments: false
    })
  //  console.log("Found blogs: ", blogs)
    res.send(blogs)
  })

  app.post("/api/blogs", requireLogin, async (req, res) => {
    // Properties on req.body sent from redux form.
    // Notice recipients formatted so
    const { title, subject, body, mentions } = req.body
    const blog = new Blogs({
      title,
      subject,
      body,
      mentions: mentions.split(",").map(mention => ({ mention: mention.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // console.log("survey model instance created in api/blogs route: " + blog)
    // Blogs is actually simple javascript object that contains data from
    // redux form, but also an array of recipients object with email passed
    // from form data, and other properties determined in survey model schema.
    // const mailer = new Mailer(blog, blogTemplate(survey))
    try {
      await blog.save()
      const user = await req.user.save()
      res.send(user)
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
  app.get('/api/blog/:blogid/detail', requireLogin, async (req, res) => {
    const { blogid } = req.params

    const blog = await Blogs.findById(blogid, function(error, success){
      if(error){
        console.log(error)
      } else {

        res.send(success)
     }
    })
    //console.log('blog detail req.params : ', req.params)

    //const blog = Blogs.findOne(_id: )
  })

  app.post('/api/comments/submit', requireLogin, requireCredits, async (req, res) => {
    const { text, blogId } = req.body
    let comment = new Comment({
      text,
      _user: req.user.id,
      _blog: blogId,
      datePosted: Date.now()
    })
    try {
      // await mailer.send()
      comment = await comment.save()
      req.user.credits -= 1
      //await req.user.save()
      res.send(comment)
    } catch(error) {
      res.status(422).send(err)
    }
  })

  app.get('/api/blog/:blogId/comments', requireLogin, async (req, res) => {
    const { blogId } = req.params
    const comments = await Comment.find({ _blog:blogId }, (error, success) => {
      if (error) {
        handleError(error)
      } else {
        console.log(success)
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
}
