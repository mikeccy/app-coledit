import Audio from 'react-howler';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Timeline from './Timeline.react';
import raf from 'raf';
import { FormattedMessage, defineMessages } from 'react-intl';

// actions
import Action from './Action';
import ActionSeq from './ActionSeq';
import ActionState from './ActionState';

const messages = defineMessages({
  loading: {
    defaultMessage: 'Loading...',
    id: 'audiocontrol.page.loading'
  },
  play: {
    defaultMessage: 'Play',
    id: 'audiocontrol.page.play'
  },
  pause: {
    defaultMessage: 'Pause',
    id: 'audiocontrol.page.pause'
  },
});

class AudioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      seek: null,
      duration: null,
    };

    this.isLoading = this.isLoading.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.getSeek = this.getSeek.bind(this);
    this.getProgress = this.getProgress.bind(this);
    this.setSeek = this.setSeek.bind(this);

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);

    this.renderSeekPos = this.renderSeekPos.bind(this);

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);

    this.lineProps = {
      onSeekProgress: this.handleSeek,
    };

    // non-rendering states
    this._userSeek = null;

    this.doStart = this.doStart.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.doStop = this.doStop.bind(this);

    this.updateMsgList = this.updateMsgList.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  stateHandler(state, key, value) {
    if (state === 'UPDATE') {
      if (!this._canvas) {
        return;
      }
      if (value.fileUrl) {
        const img = new Image;
        img.onload = () => {
          if (this.actionSeq.hasActive(key)) {
            this._canvas.drawImage(img, 0, 0);
            this._canvas.fillText(48, null, value.message, 10, 50);
          }
        };
        img.src = value.fileUrl;
      } else {
        this._canvas.fillText(48, null, value.message, 10, 50);
      }
    }
  }

  initAV(canvas) {
    this._canvas = canvas;
    // TODO testing
    this.actionSeq = new ActionSeq(canvas);
  }

  updateMsgList(map) {
    // console.log(map);
    if (!map) {
      return;
    }
    map.map((value, key) => {
      this.actionSeq.addAction(new Action(key, value, this.stateHandler));
      return true;
    });
  }

  getDuration() {
    return this.refs.audio.duration();
  }

  getSeek() {
    return this.refs.audio.seek();
  }

  getProgress() {
    if (this.refs.audio.duration() !== 0) {
      return this.refs.audio.seek() / this.refs.audio.duration();
    }
    return 0;
  }

  setSeek(seek) {
    this.refs.audio.seek(seek);
  }

  isLoading() {
    return this.state.seek === null || this.state.duration === null;
  }

  handleOnLoad() {
    this.setState({
      seek: this.seek ? this.seek : 0,
      duration: this.getDuration(),
    });
    // TODO cmc
    // get duration, setup timeline scale
  }

  handleOnPlay() {
    this.setState({
      playing: true
    });
    this.setSeek(this.state.seek);
    this.doStart(this.state.seek);
    this.renderSeekPos();
  }

  handleOnEnd() {
    this.doStop(this.state.seek);
    this.setState({
      playing: false,
      seek: 0,
    });
    this.clearRAF();
  }

  handlePlay() {
    this.setState({
      playing: true
    });
  }

  handlePause() {
    this.setState({
      playing: false
    });
  }

  handleSeek(progress) {
    if (this.isLoading()) {
      return;
    }
    this._userSeek = progress * this.state.duration;
    this.doStart(this._userSeek);
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  doStart(ind) {
    // TODO move to state handler
    this.actionSeq.startAction(Math.floor(ind));
    // TODO refactor to promise
  }

  doUpdate(ind) {
    this.actionSeq.updateAction(Math.floor(ind));
  }

  doStop(ind) {
    this.actionSeq.stopAction(Math.floor(ind));
    // send completion to playback button
    // TODO refactor to promise
  }

  renderSeekPos() {
    if (this._userSeek !== null) {
      this.setSeek(this._userSeek);
      this._userSeek = null;
    }

    this.setState({
      seek: this.getSeek(),
    });

    this.doUpdate(this.state.seek);
    this.refs.line.updateProgress(this.getProgress());
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  render() {
    this.updateMsgList(this.props.map);

    return (
      <div>
        <Audio
          src={require('./demo.ogg')}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          ref="audio"
        />
        <Timeline {...this.lineProps} ref="line" />
        <button onClick={this.handlePlay}><FormattedMessage {...messages.play} /></button>
        <button onClick={this.handlePause}><FormattedMessage {...messages.pause} /></button>

        <p>
          {this.isLoading() ? <FormattedMessage {...messages.loading} /> : ''}
          {this.isLoading() ? '' : this.state.seek.toFixed(2)}
          {this.isLoading() ? '' : ' / '}
          {this.isLoading() ? '' : this.state.duration.toFixed(2)}
        </p>
      </div>
    );
  }
}

export default AudioControl;
