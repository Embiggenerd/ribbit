const sendgrid = require("sendgrid")
const helper = sendgrid.mail
const keys = require("../config/keys")

class Mailer extends helper.Mail {
  constructor({ email }, content) {
    super() 

    this.sgApi = sendgrid(keys.sendGridKey)
    this.from_email = new helper.Email("no-reply@ribbit.ai")
    this.subject = "Someone commented on yout blog!"
    this.body = new helper.Content("text/html", content)
    this.recipient = this.formatAddresses(email)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(email) {
    // sendgrid needs us to wrap recipient email addresses
    // in their helper.Email class
    // return recipients.map(({ email }) => {
    return new helper.Email(email)
    // })
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    // Elements of formatted recipients array added to
    // personalize object, object then added to our Mailer instance
    const personalize = new helper.Personalization()
    // this.recipients.forEach(recipient => {
    personalize.addTo(this.recipient)
  //  })
    this.addPersonalization(personalize)
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: this.toJSON()
      })
      const response = await this.sgApi.API(request)
      return response
    }catch(error){ console.log('error', error.response.body)}
  }
}

module.exports = Mailer
