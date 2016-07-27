import { combineReducers } from 'redux'
import users from './users'
import messages from './messages'

const workspaceApp = combineReducers({
  users,
  messages,
})

export default workspaceApp
