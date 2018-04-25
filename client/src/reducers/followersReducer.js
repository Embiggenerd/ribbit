import { FETCH_FOLLOWERS, TO_FOLLOW } from "../actions/types"

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return action.payload.reverse()
    case TO_FOLLOW:
      return [action.follower, ...state]
    default:
      return state
  }
}
