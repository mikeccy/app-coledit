import Component from 'react-pure-render/component';
import React from 'react';
import raf from 'raf';
import ReactHowler from 'react-howler';

// TODO cmc refactor
import Action from '../seq/Action';
import ActionSeq from '../seq/ActionSeq';
import memCache from 'memory-cache';
import { fileService } from '../App';

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

const getDataUri = (url, dim, callback) => {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.onload = function () {
      const canvas = document.createElement('canvas');

      const fit = calculateAspectRatioFit(
        this.naturalWidth,
        this.naturalHeight,
        dim.width,
        dim.height
      );

      canvas.width = dim.width;
      canvas.height = dim.height;

      canvas.getContext('2d').drawImage(this, 0, 0, fit.width, fit.height);

      callback(canvas.toDataURL('image/png', 0.5));
  };
  image.src = url;
};

const cacheImage = (fileId, dim) => {
  fileService.get(fileId).then(
    (file) => getDataUri(file.url, dim, (dataUrl) => memCache.put(fileId, dataUrl))
  );
}

class CanvasAudio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: {
        width: 0,
        height: 0,
      }
    };

    // TODO cmc
    this.actionSeq = null;
    this.init = this.init.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.updateMsgList = this.updateMsgList.bind(this);
    this.doStart = this.doStart.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.doStop = this.doStop.bind(this);

    this._context = null;
    this._rect = null;

    this._canvasClear = this._canvasClear.bind(this);
    this._canvasDrawImage = this._canvasDrawImage.bind(this);
    this._canvasFillText = this._canvasFillText.bind(this);

    this.onAudioLoad = this.onAudioLoad.bind(this);
    this.onAudioLoadError = this.onAudioLoadError.bind(this);
    this.onAudioPlay = this.onAudioPlay.bind(this);
    this.onAudioPlayUpdate = this.onAudioPlayUpdate.bind(this);
    this.onAudioPause = this.onAudioPause.bind(this);
    this.onAudioEnd = this.onAudioEnd.bind(this);

    this.clearRAF = this.clearRAF.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this._context = this.refs.canvas.getContext('2d');
    this._rect = this.refs.area.getBoundingClientRect();
    this.setState({
      screen: {
        width: this._rect.width,
        height: this._rect.height,
      }
    });
    this._context.canvas.width = this._rect.width;
    this._context.canvas.height = this._rect.height;

    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages !== this.props.messages) {
      this.updateMsgList(nextProps.messages);
    }

    if (nextProps.userSeekPos !== undefined && nextProps.userSeekPos !== this.props.userSeekPos) {
      this.refs.audio.seek(nextProps.userSeekPos);
      if (this.props.onAudioSeekEdited) {
        this.props.onAudioSeekEdited();
      }
      this.doStart(nextProps.userSeekPos);
      this.onAudioPlayUpdate();
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
    this.doStart(this.refs.audio.seek());
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
    this.doStop(this.refs.audio.seek());
  }

  onAudioEnd() {
    if (this.props.onAudioEnd) {
      this.props.onAudioEnd();
    }
    this.doStop(this.refs.audio.seek());
  }

  // Canvas internals

  _canvasClear() {
    if (!this._context) {
      return;
    }

    this._context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
  }

  _canvasDrawImage(image, dx, dy) {
    if (!this._context) {
      return;
    }

    const fit = calculateAspectRatioFit(
      image.naturalWidth,
      image.naturalHeight,
      this.state.screen.width,
      this.state.screen.height
    );
    this._context.drawImage(
      image,
      dx,
      dy,
      fit.width,
      fit.height
    );
  }

  _canvasFillText(size, color, text, dx, dy) {
    if (!this._context) {
      return;
    }

    this._context.font = `${size}px Helvetica Neue`;
    this._context.fillText(
      text,
      dx,
      dy
    );
  }

  // Main loop internals

  clearRAF() {
    raf.cancel(this._raf);
  }

  tick() {
    this.onAudioPlayUpdate();
    this.doUpdate(this.refs.audio.seek());
    if (this.props.playing) {
      this._raf = raf(this.tick);
    }
  }

  // TODO cmc refactor
  init() {
    this.actionSeq = new ActionSeq(this, 0.05);
  }

  stateHandler(state, key, value) {
    if (!this._context) {
      return;
    }

    if (state === 'UPDATE') {
      if (value.files && value.files.length > 0) {
        const dataUrl = memCache.get(value.files[0]);
        if (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
              if (this.actionSeq.hasActive(key)) {
                this._canvasDrawImage(img, 0, 0);
              }
          }
        }
      }
    }
  }

  updateMsgList(list) {
    if (!list) {
      return;
    }
    list.map((value) => {
      this.actionSeq.addAction(new Action(value._id, value, this.stateHandler));
      if (value.files.length > 0) {
        if (!memCache.get(value.files[0])) {
          cacheImage(value.files[0], this.state.screen);
        }
      }
      return true;
    });
    this.actionSeq.cleanActions(list);
  }

  doStart(ind) {
    this.actionSeq.startAction(ind);
  }

  doUpdate(ind) {
    this.actionSeq.updateAction(ind);
  }

  doStop(ind) {
    this.actionSeq.stopAction(ind);
  }

  // TODO cmc needs a multitrack asset management system
  render() {
    return (
      <main ref="area" className="canvas flex flex-column flex-4 clear">
        <ReactHowler
          src="asset/demo.ogg"
          playing={this.props.playing}
          loop={false}
          onLoad={this.onAudioLoad}
          onLoadError={this.onAudioLoadError}
          onPlay={this.onAudioPlay}
          onPause={this.onAudioPause}
          onEnd={this.onAudioEnd}
          ref="audio"
        />
        <canvas
          ref="canvas"
          style={{
            padding: 5,
          }}
        />
      </main>
    );
  }
}

export default CanvasAudio;
