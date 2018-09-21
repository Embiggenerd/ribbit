import { FETCH_FOLLOWERS, TO_FOLLOW, TO_UNFOLLOW } from '../actions/types';

// This is the followers list displayed when you go to a user's
// info page. This list is updated by a user's actions instantly,
// without fetching a new list.
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return action.payload.reverse();
    case TO_FOLLOW:
      return [action.follower, ...state];
    case TO_UNFOLLOW:
      // console.log('toUnfollow called in userfollowersreducer');
      // console.log(
      //   'type of unfollow:',
      //   typeof action.follower._user,
      //   typeof action.unfollower._id
      // );
      return state.filter(follower => {
        return follower._user != action.unfollower._id;
      });

    default:
      return state;
  }
}
