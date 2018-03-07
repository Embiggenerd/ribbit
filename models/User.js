const mongoose = require("mongoose")
const { Schema } = mongoose

/*
  Schemas can be thought of as constructors of models. They both have
  methods relevant to their purpose. 
*/

const userSchema = new Schema({
  googleID: String,
  name: String

})

mongoose.model('users', userSchema)
