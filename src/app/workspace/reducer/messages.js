import { List } from 'immutable';

const message = (state, action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED':
      return action.message;
    default:
      return state;
  }
}

const messages = (state = List(), action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED':
      return state.push(message(undefined, action));
    default:
      return state;
  }
}

export default messages;
