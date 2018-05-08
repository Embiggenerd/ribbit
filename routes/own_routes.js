const User = require("../models/User")
const Blog = require("../models/Blog")
const _ = require("lodash")
const { ownTimelineRank, trendingRank } = require("../utils/rankAlgs")

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

  /*
* Finds list of people user is following, make list of lists of 20 of their blogs
most recent blogs.
* Attach to each blog object a ranking based on author's reading hours, time since posted.
* flatten array, sort by ranking, return.
*
*/
  app.get("/api/own/timeline", async (req, res) => {
    console.log("ownTimeline route invoked")
    try {
      const { following } = await User.findById(req.user.id).select("following")
      const followBlogsArr = await Promise.all(
        following.map(async follow => {
          try {
            const user = await User.findById(follow._user).select(
              "readingHours"
            )
            const followBlogs = await Blog.find({ _user: follow._user })
              .sort("-dateSent")
              .limit(20)
            const blogsWithHours = followBlogs.map(blog => ({
              ...blog._doc,
              ranking: ownTimelineRank(blog.dateSent, user.readingHours)
            }))
            return blogsWithHours
          } catch (error) {
            console.log(error)
          }
        })
      )
      const flatSortedBlogs = followBlogsArr
        .reduce((a, b) => a.concat(b))
        .sort((a, b) => b.ranking - a.ranking)
      res.send(flatSortedBlogs)
    } catch (error) {
      console.log(error)
    }
  })

  /*
  *Finds the last 50 blogs written into database.
  *Makes parallel queries for the authors of the blogs' reading hours.
  *Adds the reading hours to each blog so that a ranking alg can determine
  their sort order.
   */
  app.get("/api/own/trending", async (req, res) => {
    // Convoluted parts have to do with minimizing queries to per authors
    // instead of per blog
    try {
      const trendingBlogs = await Blog.find({})
        .sort("-dateSent")
        .limit(50)
      const trendingAuthors = trendingBlogs.map(blog => blog._user.toString())
      // get list of unique authors to find their readingHours
      const uniqAuthors = [...new Set(trendingAuthors)]

      const authorHours = await Promise.all(
        uniqAuthors.map(async author => {
          const user = await User.findById(author).select("readingHours")
          return { readingHours: user.readingHours, _user: author }
        })
      )
      // Reduces list of oject that have an author and reading hours property
      // To one object with name of author's ID and it's value author's reading hours
      const handler = authorHours.reduce((acc, next) => {
        acc[next._user] = next.readingHours
        return acc
      }, {})
      const rankedTrending = trendingBlogs
        .map(blog => {
          return Object.assign({}, blog._doc, {
            ranking: trendingRank(blog.dateSent, handler[blog._user])
          })
        })
        .sort((a, b) => b.ranking - a.ranking)
      res.send(rankedTrending)
    } catch (error) {
      console.log(error)
    }
  })
}
