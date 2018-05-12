const boomHandler = (err, req, res, next) => {
  if (err.isServer) {
    console.log("error not boom object")
  }
  return res.status(err.output.statusCode).json(err.output.payload);
}

const errorLogger = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}
const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
    res.status(403).send({ error: 'You must be logged in!' })
    res.status(404).send({ error: '404ed'})
  } else {
    next(err)
  }
}
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

module.exports = {
  boomHandler,
  clientErrorHandler,
  errorLogger,
  errorHandler
}
