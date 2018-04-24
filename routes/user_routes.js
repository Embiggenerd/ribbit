const User = require("../models/User")

module.exports = app => {
  app.get("/api/users/:_id/following", (req, res) => {
    User.findOne({ _id: req.params._id }, (errer, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.following)
      }
    })
  })
}

module.exports = app => {
  app.get("/api/users/:_id/followers", (req, res) => {
    User.findOne({ _id: req.params._id }, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        res.send(success.followers)
      }
    })
  })
}

module.exports = app => {
  app.post('/api/users/:_id/followers', (req, res) => {
    User.findOne({_id: req.params._id}, (error, success) => {
      if (error) {
        console.log(error)
      } else {
        const newFollower = {
          displayName: req.user.displayName,
          _user: req.user.id
        }
        success.followers.push(newFollower)
        success.save()
        const newFollow = {
          _user: success._id,
          displayName: success.displayName
        }
        req.user.following.push(newFollow)
        req.user.save()
      }
    })
  })
}
