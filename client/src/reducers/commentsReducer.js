import { FETCH_COMMENTS, SUBMIT_COMMENT } from '../actions/types'

export default function(state=[], action){
  switch(action.type){
    case FETCH_COMMENTS:
      return action.payload.reverse()
    case SUBMIT_COMMENT:
      console.log("payload CommentReducer receives from submitComment: ", action.payload)
      return [ action.payload, ...state]
    default:
      return state
  }
}
