export const logger = store => next => action => {
  console.group(action.type)
  console.info("dispatching", action)
  let result = next(action)
  console.log("next state", store.getState())
  console.groupEnd(action.type)
  return result
}

export const wrapAsync = fn => dispatch => {
  Promise.resolve(
    fn(dispatch).catch(err => {
      console.log("full error:",err)
      dispatch({
        type: "error",
        message: err.response.data
      })
    })
  )
}
