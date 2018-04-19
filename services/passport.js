const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const keys = require("../config/keys")
// if (process.env.NODE_ENV == 'test' ) {
//   GoogleStrategy = require('passport-mock').Strategy;
// } else {
//   GoogleStrategy = require('passport-google-oauth20').Strategy;
// }

/*
  Passport is a middlewhere on node which modifies the request object.
  passport.initialize and .use were invoked in root server file,
  and passport.authenticate is invoked in appropriate express.get routes.

  When user goes to login, user is directed to login to google. Google then
  provides a unique identifier for the user. req.login, a passport function
  attached to req (part of session) is called.

  This calls serializeUser, which determines which data will be stored in
  req.passport.session.user = {}, and req.passport.user = {}. This is the "session
  on cookie" we talk about.

  Passport.intitalize looks for passport.user on the req object, or replaces
  it with passport.user ={} if not yet authenticated.

  Next, passport.deserializeUser is invoked on this object, and if it's there,
  considers user authenticated, and searches db by provided data and then
  attaches that object as req.user.

  1) passport.intitialized invoked on every req, insures session contains
  passport.user object, which may be {}/
  2) passport.session loads passport object onto req.user, if user is authenticated.
  3) passport.deserializeUser is called by passport.session, and allows us
  to load additional data onto req.user, which we will use in our req handling.
  4) pass.serializeUser is only used when user goes to specific login route,
  not on every request like other things.

  The passport session data are these method:
    req.login()
    req.logout()
    req.isAuthenticated()
    req.isUnAuthenticated()

  passport.use(new googleStrategy)
*/

// This is how express is
const User = mongoose.model("users")

passport.serializeUser((user, done) => {
  // It saves the the data passed as second arg to done in session
  // under req.session.passport.user = {}. In this case,
  // req.session.passport.user = {id:'123'}
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // First argument is id in object serializeUser passes to done.
  // The req.user object is filled out here, where we search
  // db for User model
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  // Our action authentication function. This determines if req.passport.user
  // is an empty object, and if it isn't what value it will have. In this case,
  // we use the user's google ID, supplied to us by google on project.id.
  new GoogleStrategy(
    // Configuration for our id on google's db so google trusts us
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // Arguments to async function is data google provides us about user.
    // Notice, we use mongoose model's findOne method, on the profile object
    // google returns about user, to return user from our database
    async (accessToken, refreshToken, profile, done) => {
      console.log("googleProfile:",profile.emails[0].value, profile.displayName, profile.id)
      const existingUser = await User.findOne({ googleID: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }
      const user = await new User({
        googleID: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName
      }).save()
      done(null, user)
    }
  )
)
