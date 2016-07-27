import { List } from 'immutable';
import { Message } from '../action/Message';

const initial = new Message();

const editingMessage = (state = initial, action) => {
  switch (action.type) {
    case 'EDITING_MESSAGE_START':
      return action.message.set('isEditing', true);
    case 'EDITING_MESSAGE_TEXT':
      return state.set('text', action.text);
    case 'EDITING_MESSAGE_SUBMIT':
      return state.set('isEditing', false);
    case 'EDITING_MESSAGE_SUBMIT_FAILURE':
      return state.set('isEditing', true);
    case 'EDITING_MESSAGE_END':
      return initial;
    default:
      return state
  }
}

export default editingMessage;
