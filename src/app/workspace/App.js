// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const App = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

export const app = App;
export const appLogin = App.authenticate();
export const appLogout = App.logout();
export const userService = App.service('users');
export const messageService = App.service('coledit-workspaces');
export const fileService = App.service('coleditfiles');
