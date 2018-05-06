import { FETCH_USER, RIB, PUT_OVER } from "../actions/types"

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false
    case RIB:
      return Object.assign({},state, {credits: action.credits})
    case PUT_OVER:
      return Object.assign({}, state, {credits: action.credits})
    default:
      return state
  }
}
