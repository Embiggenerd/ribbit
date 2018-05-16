const passport = require("passport")

module.exports = (app) => {

  app.get( // When someone goes to this URL, run passport.authenticate
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: 'select_account'
    })
  )

  // If they agree, send us user details
  app.get(
    "/auth/google/callback",
    passport.authenticate("google",
    {
     successRedirect: "/",
     failureRedirect: "/auth/google"
   })
  )

  app.get("/api/logout", (req, res) => { // logs out user
    req.logout()
    res.redirect('/')

  })

  app.get("/api/current_user", (req, res) => { // User sees his own data
    console.log("user:",req.user)
    res.send(req.user)
  })

//   app.get("/api/current_user", (req,res) => {
//     req.session = req.session || {}
//     req.session.user_tmp = fakeUser
//     res.redirect('/')
// }
}
