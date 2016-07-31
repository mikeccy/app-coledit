import { combineReducers } from 'redux';
import misc from './misc';
import users from './users';
import player from './player';
import messages from './messages';
import editingMessage from './editingMessage';

const workspaceApp = combineReducers({
  misc,
  users,
  player,
  messages,
  editingMessage,
})

export default workspaceApp
