import { FETCH_FOLLOWERS, FETCH_FOLLOWING } from "../actions/types"
import followersReducer from './followersReducer'
import followingReducer from './followingReducer'


// export default function(state = {following:[], followers: []}, action) {
//   switch (action.type) {
//     case FETCH_FOLLOWERS:
//       return (state.followers = [...action.payload])
//     case FETCH_FOLLOWING:
//       return (state.folllowing = [...action.payload])
//     default:
//       return state
//   }
// }

export default function(state={}, action) {
  return {
    followers: followersReducer(state.followers, action),
    following: followingReducer(state.following, action)
  }
}
