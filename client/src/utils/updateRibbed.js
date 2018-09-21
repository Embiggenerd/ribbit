import { ownTimelineRank } from './rankAlgs';

export default (state, action) => {
  const blogToUpdate = {};
  const newState = [...state];
  for (let i = 0; i < newState.length; i++) {
    if (newState[i]._id === action._id) {
      blogToUpdate.index = i;
      blogToUpdate.value = newState[i];
    }
  }
  const updatedBlog = Object.assign({}, blogToUpdate.value, {
    ribs: action.ribs,
    ranking: ownTimelineRank(
      blogToUpdate.value.dateSent,
      blogToUpdate.value.userReadingHours,
      action.ribs
    )
  });
  newState[blogToUpdate.index] = updatedBlog;
  return newState;
};
