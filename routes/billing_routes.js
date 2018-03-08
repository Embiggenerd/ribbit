const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")

module.exports = app => {
  // We talk to stripe via stripe.charges.create(obj). Obj has
  // charge amount set to $5, so we don't have to get that data
  // from req object. Our req.user object was put there by passport
  // when we passed mongoose.model object 'user' to our google Strategy
  // authorization funciton in /services/passport.js.
  app.post("/api/stripe", requireLogin, async (req, res) => {
    
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "5 dollars for my soul",
      source: req.body.id
    })
    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}
