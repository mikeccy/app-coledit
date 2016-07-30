import Component from 'react-pure-render/component';
import React from 'react';
import TimelineContainer from '../container/TimelineContainer';
import PlaybackContainer from '../container/PlaybackContainer';

class PlayerControl extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <main className="control flex flex-column flex-1 clear flex-cross-center">
      <TimelineContainer />
      <PlaybackContainer />
      <p>
        {this.props.seekPos.toFixed(2)}
        {' / '}
        {this.props.duration.toFixed(2)}
      </p>
    </main>;
  }
}

export default PlayerControl;
