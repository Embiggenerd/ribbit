import ownFollowingReducer from "./ownFollowingReducer"
import ownFollowersReducer from "./ownFollowersReducer"
import ownTimelineReducer from "./ownTimelineReducer"
import ownCommentsReducer from "./ownCommentsReducer"
import ownBlogsReducer from "./ownBlogsReducer"

//import { TO_FOLLOW, TO_UNFOLLOW } from "../actions/types"

export default function(state={}, action) {
  return {
    comments: ownCommentsReducer(state=[], action),
    blogs: ownBlogsReducer(state=[], action),
    timeline: ownTimelineReducer(state=[], action),
    followers: ownFollowersReducer(state=[], action),
    following: ownFollowingReducer(state=[], action)
  }
}
