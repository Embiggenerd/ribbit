import { FETCH_BLOGS, DELETE_BLOG } from "../actions/types"
import _ from "lodash"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOGS:
      return _.mapKeys(action.payload.reverse(), "_id")
    case DELETE_BLOG:
      console.log("blogReducer's delete action.payload: ", action.payload)
      const blogToRemove = action.payload._id
      const { [blogToRemove]: value, ...rest } = state
      return rest
    default:
      return state
  }
}
