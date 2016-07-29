import Component from 'react-pure-render/component';
import React from 'react';
import TimelineContainer from '../container/TimelineContainer';

class PlayerControl extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <main className="control flex flex-column flex-1 clear">
      <TimelineContainer />
    </main>;
  }
}

export default PlayerControl;
