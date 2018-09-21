import { FETCH_FOLLOWING, TO_FOLLOW, TO_UNFOLLOW } from '../actions/types';

// The list displayed under following.
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return action.payload.reverse();
    default:
      return state;
  }
}
