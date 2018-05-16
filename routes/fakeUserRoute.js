module.exports = (app) => {
  
}(req,res){


  req.session = req.session || {}
  req.session.user_tmp = fakeUser
  res.redirect('/')
}
