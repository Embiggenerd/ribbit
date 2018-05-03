const User = require("../models/User")
const Blog = require("../models/Blog")
const _ = require("lodash")
const { ownTimelineRank } = require("../utils/rankAlgs")

module.exports = app => {
  app.get("/api/own/follow", async (req, res) => {
    try {
      const ownUser = await User.findById(req.user.id)
      const ownFollowsObject = {
        followers: ownUser.followers,
        following: ownUser.following
      }
      res.send(ownFollowsObject)
    } catch (error) {
      console.log(error)
    }
  })

  app.get("/api/own/timeline", async (req, res) => {
    try {
      const { following, readingHours } = await User.findById(
        req.user.id
      ).select("following readingHours")
      const followBlogs = await Promise.all(
        following.map(async follow => {
          try {
            const followBlog = await Blog.find({ _user: follow._user })
            return followBlog
          } catch (error) {
            console.log(error)
          }
        })
      )
      const flattenedFollowBlogs = followBlogs
        .reduce((a, b) => a.concat(b))
        .map(blog => ownTimelineRank(blog, readingHours))
        .sort((a, b) => b.ranking - a.ranking)
    } catch (error) {
      console.log(error)
    }
  })
}
