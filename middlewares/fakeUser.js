const fakeUser = {
  id: "5aea0d084f0d0f4f1939d139",
  credits: 19,
  readingHours: 0.1262,
  hoursCounter: 0.1262,
  followers: [
    {
      _id: "5aecffa97ccb6317bb579efa",
      displayName: "Igor Atakhanov",
      _user: "5ade809d0d6b780e29eddca4"
    },
    {
      _id: "5aecffb67ccb6317bb579efc",
      displayName: "Igor Atakhanov",
      _user: "5ade809d0d6b780e29eddca4"
    }
  ],
  following: [
    {
      _id: "5aea0d994f0d0f4f1939d13d",
      _user: "5ade809d0d6b780e29eddca4",
      displayName: "Igor Atakhanov"
    }
  ],
  _id: "5aea0d084f0d0f4f1939d139",
  googleID: "100228955381588517297",
  email: "embiggenthyself324726@gmail.com",
  displayName: "Embiggen Thyself",
  __v: 3
}

module.exports = (req, res, next) => {
  if (
    req &&
    req.session &&
    req.session.user_tmp &&
    process.env.NODE_ENV !== "production"
  ) {
    console.log("fakeUser mw invoked")
    req.user = req.session.user_tmp
  }
  if (next) {
    next()
  }
  
}
