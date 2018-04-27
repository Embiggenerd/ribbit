import { OWN_FOLLOW } from "../actions/types"

export default function(state=[], action) {
  switch(action.type){
    case OWN_FOLLOW:
      return action.followers.reverse()
    default:
      return state
  }
}
