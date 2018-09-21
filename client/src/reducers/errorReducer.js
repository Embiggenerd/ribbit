import { CLEAR_ERROR, ERROR } from '../actions/types';

export default function(state = { message: '', data: { error: '' } }, action) {
  switch (action.type) {
    case ERROR:
      return Object.assign({}, state, {
        message: action.message,
        data: action.data
      });
    case CLEAR_ERROR:
      return { message: '', data: { error: '' } };
    default:
      return state;
  }
}
