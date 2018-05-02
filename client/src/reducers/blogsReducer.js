import { FETCH_BLOGS, DELETE_BLOG, RIB } from "../actions/types"
import _ from "lodash"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOGS:
      return _.mapKeys(action.payload.reverse(), "_id")
    case DELETE_BLOG:
      const { [action.payload._id]: value, ...rest } = state
      return rest
    case RIB:
      if (Object.keys(state).length !== 0){
        const newState = { ...state }
        const updatedBlog = Object.assign({},newState[action._id], {
          ribs: action.ribs
        })
        newState[action._id] = updatedBlog
        return newState
      } else {
        return state
      }

    default:
      return state
  }
}
