import { ERROR } from "./actions/types"

export const logger = store => next => action => {
  if(process.env.NODE_ENV !== "production"){
    console.log()
    console.group(action.type)
    console.info("dispatching", action)
    let result = next(action)
    console.log("next state", store.getState())
    console.groupEnd(action.type)
    return result
  }
  return next(action)
}

export const wrapAsync = fn => dispatch => {
  Promise.resolve(
    fn(dispatch).catch(err => {
      if (err.hasOwnProperty("response")) {
        console.log("full error:", err)
        dispatch({
          type: "error",
          message: err.message,
          data: err.response.data
        })
      }
    })
  )
}