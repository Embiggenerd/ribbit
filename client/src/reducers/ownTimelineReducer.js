import { OWN_TIMELINE, RIB } from "../actions/types"

export default (state=[], action) => {
  switch(action.type) {
    case OWN_TIMELINE:
      return action.timeline
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
        console.log("blogToUpdate: ",blogToUpdate)
        const updatedBlog = Object.assign({},blogToUpdate.value, {
          ribs: action.ribs
        })
        console.log("old state: ",newState)
        newState[blogToUpdate.index] = updatedBlog
        console.log("newState: ",newState)
        return newState
      } else {
        return state
      }
    default:
      return state
  }
}
