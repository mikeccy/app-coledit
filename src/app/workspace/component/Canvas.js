import Component from 'react-pure-render/component';
import React from 'react';

class Canvas extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <main className="canvas flex flex-column flex-4 clear">
      <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png" alt="Feathers Logo" />
    </main>;
  }
}

export default Canvas;
