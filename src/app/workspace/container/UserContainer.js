import { connect } from 'react-redux'
import { appLogout } from '../App';
import { userLogout } from '../action/User'
import UserList from '../component/UserList'

const inputProps = (state) => {
  return {
    users: state.users,
  }
}

const outputProps = (dispatch) => {
  return {
    onUserLogout: (userId) => {
      dispatch(userLogout(userId));
      appLogout.then(() => window.location.href = '/index.html');
    },
  }
}

const UserContainer = connect(
  inputProps,
  outputProps
)(UserList);

export default UserContainer;
