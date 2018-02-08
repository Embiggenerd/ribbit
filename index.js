const express = require("express")

const app = express()

app.get('/', (req, res)=>{ // Route handler with get method.
  res.send({hi:'there'}) // How to respond to this particular handler.
})

const PORT = process.env.PORT || 5000 // Heroku env variable
app.listen(PORT) // Which port to listen on.
