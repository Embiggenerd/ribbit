const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const keys = require("./config/keys")
require("./models/User")
require("./models/Survey")
require("./services/passport")


/*
  Connectio is opened, expressed is initialized as app with some middlewhere,
  our outs module is invoked with app as argument, and app.listen is invoked.
*/

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())

app.use(passport.session())

// Pass express instance to route functions modules
require("./routes/auth_routes")(app)
require("./routes/billing_routes")(app)
require("./routes/survey_routes")(app)

if (process.env.NODE_ENV === "production") {
  // Express will serve up assets from client
  // when it route is defined in express
  app.use(express.static("client/build"))

  // Express will serve up the index.html file
  // when it does not recognize the route
  const path = require("path")
  app.get("*", (req, res) => {
    // index.html contains scripting for react router
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000 // Heroku env variable
app.listen(PORT) // Which port to listen on.
