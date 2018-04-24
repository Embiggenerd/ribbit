import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'
import blogsReducer from './blogsReducer'
import blogDetailReducer from './blogDetailReducer'
import { FETCH_COMMENTS, SUBMIT_COMMENT } from "../actions/types"
import commentsReducer from "./commentsReducer"
import userReducer from "./userReducer"

export default combineReducers({
  auth: authReducer,
  form: formReducer.plugin({
    commentForm: (state, action) => {
      switch(action.type){
        case SUBMIT_COMMENT:
          return undefined
        default:
          return state
      }
    }
  }),
  surveys: surveysReducer,
  blogs: blogsReducer,
  blogDetail: blogDetailReducer,
  commentsList: commentsReducer,
  user: userReducer,
})
// export default combineReducers({
//   auth: authReducer,
//   form: formReducer,
//   surveys: surveysReducer,
//   blogs: blogsReducer,
//   blogDetail: blogDetailReducer,
//   commentsList: commentsReducer
// })
