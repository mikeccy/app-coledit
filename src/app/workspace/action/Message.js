export const messageEditStart = () => {
  return {
    type: 'MESSAGE_EDIT_START',
  }
}

export const messageEditText = (text) => {
  return {
    type: 'MESSAGE_EDIT_TEXT',
    text,
  }
}

export const messageEditSubmit = () => {
  return {
    type: 'MESSAGE_EDIT_SUBMIT',
  }
}

export const messageEditEnd = () => {
  return {
    type: 'MESSAGE_EDIT_END',
  }
}

export const messageToggleVisible = () => {
  return {
    type: 'MESSAGE_TOGGLE_VISIBLE',
  }
}

export const messageAdded = (message) => {
  return {
    type: 'MESSAGE_ADDED',
    message,
  }
}
