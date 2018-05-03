import { FETCH_BLOGS } from "../actions"

export default function(state=[], action) {
  switch(action.type){
    case FECH_BLOGS:
      return action.payload
    default: return state
  }
}
