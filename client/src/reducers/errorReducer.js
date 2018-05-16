import { CLEAR_ERROR, ERROR } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case ERROR:
      return Object.assign({}, state, {
        message: action.message,
        data: action.data
      })
    case CLEAR_ERROR:
      return {}
    default:
      return state
  }
}
