import { FETCH_FOLLOWERS } from '../actions/types'

export default function(state={}, action) {
  switch( aciton.type ) {
    case FETCH_FOLLOWERS:
      return state.followers=[...action.payload]
  }
}
