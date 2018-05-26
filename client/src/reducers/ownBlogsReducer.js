import { FETCH_BLOGS, RIB, DELETE_BLOG } from "../actions/types"

export default function(state=[], action) {
  switch(action.type){
    case FETCH_BLOGS:
      return action.payload
    case RIB:
      if (Object.keys(state).length !== 0){
        const blogToUpdate = {}
        const newState = [ ...state ]
        for(let i = 0; i < newState.length; i++) {
          if(newState[i]._id === action._id) {
            blogToUpdate.index = i
            blogToUpdate.value = newState[i]
          }

        }
        const updatedBlog = Object.assign({},blogToUpdate.value, {
          ribs: action.ribs
        })
        newState[blogToUpdate.index] = updatedBlog
        return newState
      } else {
        return state
      }
      default: return state
    case DELETE_BLOG:
      return state.filter(blog => blog._id !== action._id)
  }
}
