import { OWN_TIMELINE } from "../actions/types"

export default (state = [], action) => {
  switch(action.type) {
    case OWN_TIMELINE:
      return action.timeline
    default: return state
  }
}
