import { FETCH_BLOG_DETAIL, RIB } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOG_DETAIL:
      return action.payload
    case RIB:
      if (Object.keys(state).length !== 0) {
        return Object.assign({}, state, {ribs: action.ribs})
      } else {
        return state
      }
    default:
      return state
  }
}
