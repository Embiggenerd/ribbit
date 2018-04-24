import { FETCH_FOLLOWERS, FETCH_FOLLOWING } from "../actions/types"

export default function(state = {following:[], followers: []}, action) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return (state.followers = [...action.payload])
    case FETCH_FOLLOWING:
      return (state.folllowing = [...action.payload])
    default:
      return state
  }
}
