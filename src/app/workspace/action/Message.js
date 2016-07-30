import { Base } from './Base';
import { List } from 'immutable';

export class Message extends Base({
  text: '',
  userId: undefined,
  updatedAt: undefined,
  isEditing: false,
  startTs: undefined,
  endTs: undefined,
  files: List(),
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

export const messageUpdated = (message) => {
  return {
    type: 'MESSAGE_UPDATED',
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

export const editingMessageStartTs = (startTs) => {
  return {
    type: 'EDITING_MESSAGE_START_TS',
    startTs,
  }
}

export const editingMessageEndTs = (endTs) => {
  return {
    type: 'EDITING_MESSAGE_END_TS',
    endTs,
  }
}

export const editingMessageAppendFile = (file) => {
  return {
    type: 'EDITING_MESSAGE_APPEND_FILE',
    file,
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
