const _ = require("lodash")
const D = require("decimal")
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/requireCredits")
const User = require("../models/User")
const Follower = require("../models/Follower")
const Following = require("../models/Following")
const mongoose = require("mongoose")
const follower = mongoose.model("followers")
const following = mongoose.model("following")

module.exports = app => {
  app.get("/api/users/:_id/following", (req, res) => {
    User.findById(req.params._id, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.following)
        console.log("success.following: ", success.following)
      }
    })
  })

  app.get("/api/users/:_id/followers", (req, res) => {
    User.findById(req.params._id, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.followers)
        console.log("success.following: ", success.followers)
      }
    })
  })

  // error/result pattern for queries, and mutative.
  app.post("/api/users/:_id/followers", (req, res) => {
    User.findOne({ _id: req.params._id }, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        const newFollower = new follower({
          displayName: req.user.displayName,
          _user: req.user.id
        })
        success.followers.push(newFollower)
        success.save()
        const newFollow = new following({
          _user: success._id,
          displayName: success.displayName
        })
        req.user.following.push(newFollow)
        req.user.save()
        res.send({ follower: newFollow, follow: newFollow })
      }
    })
  })

  // async/await pattern, using non-mutative methods
  app.post("/api/users/:_id/unfollow", async (req, res) => {
    try {
      // Find user we want to unfollow, change his followers
      const unfollowed = await User.findOne({ _id: req.params._id })
      const newFollowers = unfollowed.followers.filter(follower => {
        return follower._user !== req.user.id
      })
      unfollowed.followers = newFollowers
      unfollowed.save()
      const unfollower = req.user
      const newFollowing = unfollower.following.filter(follow => {
        return follow._user !== unfollowed._id
      })
      unfollower.following = newFollowing
      unfollower.save()
      res.send({
        unfollower: unfollower.id,
        unfollowed: unfollowed._id
      })
    } catch (error) {
      console.log(error)
    }
  })

  app.post("/api/users/:_id/hours", async (req, res) => {
    let { body: { hours }, params: { _id } } = req
    try {
      let user = await User.findOne({ _id })
      const updatedHours = user.readingHours + hours
      const updatedCounter = user.hoursCounter + hours
      user.readingHours = _.round(updatedHours, 4)
      user.hoursCounter = _.round(updatedCounter, 4)
      if (user.hoursCounter >= 1) {
        user.credits += 1
        user.hoursCounter = _.round(user.readingHours % 1, 4)
      }
      user = await user.save()
      res.send(user)
    } catch (error) {
      console.log(error)
    }
  })

  app.post(
    "/api/users/:_id/putOver",
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { params: { _id } } = req
      try {
        const user = await User.findById(_id).select("credits displayName")
        user.credits += 1
        const own = req.user
        own.credits -= 1
        const updatedOwn = await own.save()
        const updatedUser = await user.save()
        res.send({ credits: updatedOwn.credits })
      } catch (error) {
        console.log(error)
      }
    }
  )
}
