const User = require("../models/User")

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
}
