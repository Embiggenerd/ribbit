import { FETCH_BLOGS } from '../actions/types'
import _ from 'lodash'

export default function(state={}, action) {
  switch (action.type){
    case FETCH_BLOGS:
      return _.mapKeys(action.payload.reverse(), '_id')
    default:
      return state
  }
}
