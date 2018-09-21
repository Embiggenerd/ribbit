import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import blogsReducer from './blogsReducer';
import blogDetailReducer from './blogDetailReducer';
import { FETCH_COMMENTS, SUBMIT_COMMENT } from '../actions/types';
import commentsReducer from './commentsReducer';
import userFollowingReducer from './userFollowingReducer';
import userFollowersReducer from './userFollowersReducer';
import ownTimelineReducer from './ownTimelineReducer';
import ownBlogsReducer from './ownBlogsReducer';
import trendingReducer from './trendingReducer';
import ownFollowingReducer from './ownFollowingReducer';
import ownFollowersReducer from './ownFollowersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer.plugin({
    commentForm: (state, action) => {
      switch (action.type) {
        case SUBMIT_COMMENT:
          return undefined;
        default:
          return state;
      }
    }
  }),
  //  blogs: blogsReducer,
  blogDetail: blogDetailReducer,
  commentsList: commentsReducer,
  // user: userReducer,
  // own: ownReducer,
  ownFollowers: ownFollowersReducer,
  ownFollowing: ownFollowingReducer,
  ownBlogs: ownBlogsReducer,
  ownTimeline: ownTimelineReducer,
  trending: trendingReducer,
  userFollowers: userFollowersReducer,
  userFollowing: userFollowingReducer,
  error: errorReducer
});
// export default combineReducers({
//   auth: authReducer,
//   form: formReducer,
//   surveys: surveysReducer,
//   blogs: blogsReducer,
//   blogDetail: blogDetailReducer,
//   commentsList: commentsReducer
// })
