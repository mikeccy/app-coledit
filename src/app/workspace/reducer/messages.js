import { List } from 'immutable';

const message = (state, action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED':
    case 'MESSAGE_UPDATED':
      return action.message;
    default:
      return state;
  }
}

const messages = (state = List(), action) => {
  console.log(state.size);
  switch (action.type) {
    case 'MESSAGE_ADDED':
      return state.push(message(undefined, action));
    case 'MESSAGE_UPDATED':
      const index = state.findIndex((value) => value._id === action.message._id);
      if (index >= 0) {
        return state.set(index, message(undefined, action));
      } else {
        return state;
      }
    case 'MESSAGE_REMOVED':
      const index2 = state.findIndex((value) => value._id === action.message._id);
      if (index2 >= 0) {
        return state.delete(index2);
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default messages;
