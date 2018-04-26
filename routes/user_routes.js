const User = require("../models/User")
const Follower = require("../models/Follower")
const Following = require("../models/Following")
const mongoose = require("mongoose")
const follower = mongoose.model("followers")
const following = mongoose.model("following")


module.exports = app => {
  app.get("/api/users/:_id/following", (req, res) => {
    console.log("fetchFolloweing req.params._id: ", req.params._id)

    User.findById(req.params._id, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.following)
        console.log("success.following: ",success.following)
      }
    })
  })

  // app.get("/api/users/:_user/comments", async (req, res) => {
  //   const { _user } = req.params
  //   console.log("fetchUserComments router: ", _user)
  //   try {
  //     const comments = await Comment.find({ _user })
  //     res.send(comments)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  app.get("/api/users/:_id/followers", (req, res) => {
    console.log("fetchFollowers req.params._id: ", req.params._id)
    User.findById(req.params._id, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.followers)
        console.log("success.following: ",success.followers)

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
        res.send({follower: newFollow, follow: newFollow})
      }
    })
  })

  // async/await pattern, using non-mutative methods
  app.post("/api/users/:_id/unfollow", async (req, res) => {
    try {
      // Find user we want to unfollow, change his followers
      const unfollowed = await User.findOne({ _id: req.params._id})
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
    } catch(error){
      if(error){
        console.log(error)
      }
    }



  })
}
