import { FETCH_COMMENTS, SUBMIT_COMMENT, DELETE_COMMENT } from '../actions/types'
import _ from 'lodash'

export default function(state=[], action){
  switch(action.type){
    case FETCH_COMMENTS:
      return action.payload.reverse()
    case SUBMIT_COMMENT:
      return [ action.payload, ...state]
    case DELETE_COMMENT:
      const { _id } = action.payload
      return state.filter(comment => comment._id !== _id)
    default:
      return state
  }
}
