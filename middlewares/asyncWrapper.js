/*
Invokes our route callback, passes any caught errors to next,
reduces bloat of route code*/
module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.log("Full error on backend: ",JSON.stringify(err, null, 2))
    next(err)
  })
}
