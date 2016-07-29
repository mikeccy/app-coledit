import { combineReducers } from 'redux';
import users from './users';
import player from './player';
import messages from './messages';
import editingMessage from './editingMessage';

const workspaceApp = combineReducers({
  users,
  player,
  messages,
  editingMessage,
})

export default workspaceApp
