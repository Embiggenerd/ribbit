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
const wrapAsync = require("../middlewares/asyncWrapper")

module.exports = app => {
  app.get(
    "/api/users/:_id/following",
    wrapAsync(async (req, res) => {
      const user = await User.findById(req.params._id)
      res.send(user.following)
    })
  )

  app.get(
    "/api/users/:_id/followers",
    wrapAsync(async (req, res) => {
      const user = await User.findById(req.params._id)
      res.send(user.followers)
    })
  )

  // error/result pattern for queries, and mutative.
  // app.post("/api/users/:_id/followers", (req, res) => {
  //   User.findOne({ _id: req.params._id }, (error, success) => {
  //     if (error) {
  //       console.log(error)
  //     } else {
  //       const newFollower = new follower({
  //         displayName: req.user.displayName,
  //         _user: req.user.id
  //       })
  //       success.followers.push(newFollower)
  //       success.save()
  //       const newFollow = new following({
  //         _user: success._id,
  //         displayName: success.displayName
  //       })
  //       req.user.following.push(newFollow)
  //       req.user.save()
  //       res.send({ follower: newFollow, follow: newFollow })
  //     }
  //   })
  // })

  /*
  * Adds user to requester's following list, adds requester to user's following list
  */
  app.post(
    "/api/users/:_id/followers",
    wrapAsync(async (req, res) => {
      const user = await User.findOne({ _id: req.params._id })

      const newFollower = new follower({
        displayName: req.user.displayName,
        _user: req.user.id
      })
      user.followers.push(newFollower)
      await user.save()
      const newFollow = new following({
        _user: user._id,
        displayName: user.displayName
      })
      req.user.following.push(newFollow)
      await req.user.save()
      res.send({ follower: newFollow, follow: newFollow })
    })
  )

  /*
  Find user requester wants to unfollow, change user's followers, reqester's following
  */

  app.post(
    "/api/users/:_id/unfollow",
    wrapAsync(async (req, res) => {
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
    })
  )

  app.post(
    "/api/users/:_id/hours",
    wrapAsync(async (req, res) => {
      let { body: { hours }, params: { _id } } = req

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
    })
  )

  /*
  * Take credit away from requester, add credit to user
  */
  app.post(
    "/api/users/:_id/putOver",
    requireLogin,
    requireCredits,
    wrapAsync(async (req, res) => {
      const { params: { _id } } = req

      const user = await User.findById(_id).select("credits displayName")
      user.credits += 1
      const own = req.user
      own.credits -= 1
      const updatedOwn = await own.save()
      const updatedUser = await user.save()
      res.send({ credits: updatedOwn.credits })
    })
  )
}
