import { FETCH_BLOG_DETAIL } from '../actions/types'

export default function(state={}, action ) {
  switch(action.type) {
    case FETCH_BLOG_DETAIL:
      return action.payload
    default:
      return state
  }
}
