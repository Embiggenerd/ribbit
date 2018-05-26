const passport = require("passport")
const User = require("../models/User")
const wrapAsync = require("../middlewares/asyncWrapper")
const { fakeUser } = require("../middlewares/fakeUser")

module.exports = app => {
  app.get(
    // When someone goes to this URL, run passport.authenticate
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account"
    })
  )

  // If they agree, send us user details
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/auth/google"
    })
  )

  app.get("/api/logout", (req, res) => {
    // logs out user
    req.logout()
    res.redirect("/")
  })

  // if (process.end.NODE_ENV === "test") {
  //   app.get("/api/current_user", async (req, res) => {
  //     const fakeUser = await User.findById("5aea0d084f0d0f4f1939d139")
  //     req.session = req.session || {}
  //     req.session.user_tmp = fakeUser
  //   })
  // } else {
  //   app.get("/api/current_user", (req, res) => {
  //     res.send(req.user)
  //   })
  // }

  app.get("/api/current_user", (req, res) => {
    res.send(req.user)
  })
}
