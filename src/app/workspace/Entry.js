import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { appLogin } from './App';
import workspaceApp from './reducer';
import Workspace from './container/Workspace';

appLogin.then(() => {
  let store = createStore(workspaceApp);
  ReactDOM.render(
    <Provider store={store}>
      <Workspace />
    </Provider>,
    document.getElementById('workspace')
  );
}).catch(error => {
  if (error.code === 401) {
    window.location.href = '/login.html';
  }

  console.error(error);
});
