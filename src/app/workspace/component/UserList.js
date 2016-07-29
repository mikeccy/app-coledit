import Component from 'react-pure-render/component';
import React from 'react';
import { app } from '../App';

class UserList extends Component {

  render() {
    const {
      users,
      onUserLogout,
    } = this.props;

    const me = app.get('user');

    return <aside className="sidebar col col-3 flex flex-column flex-space-between">
      <header className="flex flex-row flex-center">
        <h4 className="font-300 text-center">
          <span className="font-600 online-count">{users.length}</span> users
        </h4>
      </header>

      <ul className="flex flex-column flex-1 list-unstyled user-list">
        {users.map(user =>
          <li key={user._id}>
            <a className="block relative" href="#">
              <img src={user.avatar} className="avatar" />
              <span className="absolute username">{user.email}</span>
            </a>
          </li>
        )}
      </ul>
      <footer className="flex flex-row flex-center">
        <a href="#" className="logout button button-primary" onClick={() => onUserLogout(me._id)}>
          登出
        </a>
      </footer>
    </aside>;
  }
}

export default UserList;
