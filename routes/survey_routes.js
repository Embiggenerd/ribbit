const _ = require("lodash")
const Path = require("path-parser")
const { URL } = require("url")
const mongoose = require("mongoose")
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/requireCredits")
const Mailer = require("../services/Mailer")
const surveyTemplate = require("../services/emailTemplates/surveyTemplate")

const Survey = mongoose.model("surveys")

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    })
    res.send(surveys)
  })

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for clicking!")
  })

  app.post("/api/surveys/webhooks", (req, res) => {
    // URL(localhost:500/path/to/file).pathname returns  '/path/to/file'
    // where p ='/posts/:id', pathname="/posts/321", p.test(pathname) =
    // {id:'321'}
    const p = new Path("/api/surveys/:surveyId/:choice")
    // The methods called on _.chain() are actually lodash functions,
    // passing their return value to the next, with value() returning final output,
    // which is simple object we can save to data base with only the data we need.
    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy("email", "survey")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // Properties on req.body sent from redux form.
    // Notice recipients formatted so
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    //console.log("survey model instance created in api/surveys route: " + survey)
    // Survey is actually simple javascript object that contains data from
    // redux form, but also an array of recipients object with email passed
    // from form data, and other properties determined in survey model schema.
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch (error) {
      res.stats(422).send(err)
    }
  })
}
