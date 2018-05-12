export default function (state={}, action) {
  switch(action.type) {
    case "error":
      return Object.assign({}, state, {message: action.message})
    default: return state
  }
}
