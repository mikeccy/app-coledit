import App from './App';
import Workspace from './Workspace.react';

App.authenticate().then(() => {
  ReactDOM.render(<div id="app" className="flex flex-column">
    <header className="title-bar flex flex-row flex-center">
      <div className="title-wrapper block center-element">
        <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png" alt="Feathers Logo" />
        <span className="title">Coledit</span>
      </div>
    </header>

    <Workspace />
  </div>, document.getElementById('workspace'));
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/login.html'
  }

  console.error(error);
});
