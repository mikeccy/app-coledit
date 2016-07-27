const message = (state, action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED':
      return action.message;
    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED':
      return [
        ...state,
        message(undefined, action)
      ];
    default:
      return state
  }
}

export default messages
