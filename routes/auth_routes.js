const passport = require("passport")

/*
  We made module.exports an invokable function, take
*/
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
    res.send(req.user)
  })
}
