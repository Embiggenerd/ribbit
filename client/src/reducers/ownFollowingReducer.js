import { TO_FOLLOW, TO_UNFOLLOW, OWN_FOLLOW } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case OWN_FOLLOW:
      return action.following.reverse();
    case TO_FOLLOW:
      return [action.followed, ...state];
    case TO_UNFOLLOW:
      return state.filter(follow => follow._user !== action.unfollowed);
    default:
      return state;
  }
}
