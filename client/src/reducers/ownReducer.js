import ownFollowingReducer from "./ownFollowingReducer"
import ownFollowersReducer from "./ownFollowersReducer"

//import { TO_FOLLOW, TO_UNFOLLOW } from "../actions/types"

export default function(state={}, action) {
  return {
    followers: ownFollowersReducer(state=[], action),
    following: ownFollowingReducer(state=[], action)
  }
}
