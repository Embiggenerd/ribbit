import Users from '../models/User'
import requireLogin from '../middlewares/requireLogin'
module.exports(app) => {
  app.get('/api/users/:_id/followers', (req, res) => {
    req.params._id
  })
}
