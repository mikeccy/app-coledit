import Component from 'react-pure-render/component';
import React from 'react';
import raf from 'raf';
import ReactHowler from 'react-howler';

class Audio extends Component {

  constructor(props) {
    super(props);

    this.onAudioLoad = this.onAudioLoad.bind(this);
    this.onAudioLoadError = this.onAudioLoadError.bind(this);
    this.onAudioPlay = this.onAudioPlay.bind(this);
    this.onAudioPlayUpdate = this.onAudioPlayUpdate.bind(this);
    this.onAudioPause = this.onAudioPause.bind(this);
    this.onAudioEnd = this.onAudioEnd.bind(this);

    this.clearRAF = this.clearRAF.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillReceiveProps(nextProps) {    
    if (nextProps.seekPos && nextProps.seekPos !== this.props.seekPos) {
      this.refs.audio.seek(nextProps.seekPos);
    }
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  onAudioLoad() {
    if (this.props.onAudioLoad) {
      this.props.onAudioLoad(this.refs.audio.duration());
    }
  }

  onAudioLoadError() {
    if (this.props.onAudioLoadError) {
      this.props.onAudioLoadError(0);
    }
  }

  onAudioPlay() {
    if (this.props.onAudioPlay) {
      this.props.onAudioPlay();
    }
    this.tick();
  }

  onAudioPlayUpdate() {
    if (this.props.onAudioPlayUpdate) {
      this.props.onAudioPlayUpdate(this.refs.audio.seek());
    }
  }

  onAudioPause() {
    if (this.props.onAudioPause) {
      this.props.onAudioPause();
    }
  }

  onAudioEnd() {
    if (this.props.onAudioEnd) {
      this.props.onAudioEnd();
    }
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  tick() {
    this.onAudioPlayUpdate();
    if (this.props.playing) {
      this._raf = raf(this.tick);
    }
  }

  // TODO cmc needs a multitrack asset management system
  render() {
    return (
      <ReactHowler
        src="asset/demo.ogg"
        playing={this.props.playing}
        onLoad={this.onAudioLoad}
        onLoadError={this.onAudioLoadError}
        onPlay={this.onAudioPlay}
        onPause={this.onAudioPause}
        onEnd={this.onAudioEnd}
        ref="audio"
      />
    );
  }
}

export default Audio;
