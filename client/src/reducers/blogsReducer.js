import { FETCH_BLOGS, DELETE_BLOG } from "../actions/types"
import _ from "lodash"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOGS:
      return _.mapKeys(action.payload.reverse(), "_id")
    case DELETE_BLOG:
      const { [action.payload._id]: value, ...rest } = state
      return rest
    default:
      return state
  }
}
