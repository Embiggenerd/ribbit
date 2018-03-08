const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const keys = require("./config/keys")
require("./models/User")
require("./services/passport")
const bodyParser = require ('body-parser')

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
    keys: [keys.cookieKey],
  })
)

app.use(passport.initialize())

app.use(passport.session())

// Pass express instance to route functions modules
require("./routes/auth_routes")(app)
require("./routes/billing_routes")(app)


const PORT = process.env.PORT || 5000 // Heroku env variable
app.listen(PORT) // Which port to listen on.
