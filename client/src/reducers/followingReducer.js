import { FETCH_FOLLOWING, TO_FOLLOW } from "../actions/types"

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return action.payload.reverse()
    case TO_FOLLOW:
      return [action.follow, ...state]
    default:
      return state
  }
}
