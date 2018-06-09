const User = require("../models/User")

// If NODE_ENV variable === test, mock passport's deserialize user with 
// fake user from database.
module.exports = async(req,res,next) => {
  try{
    const fakesies = await User.findById("5aea0d084f0d0f4f1939d139")
    if(process.env.NODE_ENV === "test"){
      console.log("backend node_env:", process.env.NODE_ENV)
      console.log("fakemw invoked")
      req.user = Object.assign(fakesies, {id:"5aea0d084f0d0f4f1939d139"})
    }
    if( next ){ next() }

  }catch(error){console.log(error)}

}
