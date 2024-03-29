import { List } from 'immutable';
import { Message } from '../action/Message';

const initial = new Message();

const editingMessage = (state = initial, action) => {
  switch (action.type) {
    case 'EDITING_MESSAGE_START':
      return action.message.set('isEditing', true);
    case 'EDITING_MESSAGE_TEXT':
      return state.set('text', action.text);
    case 'EDITING_MESSAGE_START_TS':
      return state.set('startTs', action.startTs);
    case 'EDITING_MESSAGE_END_TS':
      return state.set('endTs', action.endTs);
    case 'EDITING_MESSAGE_APPEND_FILE':
      const files = state.get('files');
      return state.set('files', files.push(action.file._id));
    case 'EDITING_MESSAGE_SUBMIT':
      return state.set('isEditing', false);
    case 'EDITING_MESSAGE_SUBMIT_FAILURE':
      return state.set('isEditing', true);
    case 'EDITING_MESSAGE_END':
      return initial;
    case 'EDITING_MESSAGE_MODIFY_END':
      if (!state.isNew()) {
        return initial;
      } else {
        return state;
      }
    default:
      return state
  }
}

export default editingMessage;
