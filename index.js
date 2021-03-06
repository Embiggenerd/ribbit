const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const keys = require("./config/keys")
const fakeUserMW = require("./middlewares/fakeUser")
//const { errorLogger, clientErrorHandler, errorHandler, boomHandler } =require("./middlewares/validatorMiddleware")
require("./models/User")
require("./services/passport")


/*
* Connection is opened, express is initialized as app with some middlewhere,
  our routes module is invoked with app as argument, and app.listen is invoked.
*/

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())

app.use(fakeUserMW)

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
require("./routes/blog_routes")(app)
require("./routes/user_routes")(app)
require("./routes/own_routes")(app)

if (process.env.NODE_ENV === "production") {
  // Express will serve up assets from client
  // when the route is defined in express
  app.use(express.static("client/build"))


  // Express will serve up the index.html file
  // when it does not recognize the route
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.use((err, req, res, next) => {
  if(err.name){
    const fullError = res.status(500).send(err.message)
    console.log("fullerror on backend:",fullError.response)
  }

  next(err)
})


const PORT = process.env.PORT || 5000 // Heroku env variable


app.listen(PORT) // Which port to listen on.

module.exports = app
