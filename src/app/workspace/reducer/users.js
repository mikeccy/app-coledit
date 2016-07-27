import { List } from 'immutable';

const user = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.user;
    case 'USER_LOGOUT':
      return state._id !== action.userId;
    default:
      return state;
  }
}

const users = (state = List(), action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return state.push(user(undefined, action));
    case 'USER_LOGOUT':
      return state.filter(t => user(t, action));
    default:
      return state;
  }
}

export default users;
