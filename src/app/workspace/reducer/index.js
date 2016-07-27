import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';
import editingMessage from './editingMessage';

const workspaceApp = combineReducers({
  users,
  messages,
  editingMessage,
})

export default workspaceApp
