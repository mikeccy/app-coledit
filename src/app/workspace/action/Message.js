import { Base } from './Base';

export class Message extends Base({
  text: '',
  userId: undefined,
  updatedAt: undefined,
  isEditing: false,
}) {
  isEditing() {
    return this.get('isEditing');
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

export const editingMessageStart = (message) => {
  return {
    type: 'EDITING_MESSAGE_START',
    message,
  }
}

export const editingMessageText = (text) => {
  return {
    type: 'EDITING_MESSAGE_TEXT',
    text,
  }
}

export const editingMessageSubmit = () => {
  return {
    type: 'EDITING_MESSAGE_SUBMIT',
  }
}

export const editingMessageEnd = () => {
  return {
    type: 'EDITING_MESSAGE_END',
  }
}
