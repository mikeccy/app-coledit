import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

class Canvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ratio: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      screen: {
        width: props.width,
        height: props.height,
      }
    };

    this.drawImage = this.drawImage.bind(this);
    this.fillText = this.fillText.bind(this);
    this.clear = this.clear.bind(this);

    // non rendering states
    this._context = null;
  }

  componentDidMount() {
    this._context = this.refs.canvas.getContext('2d');
  }

  clear() {
    this._context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
  }

  drawImage(image, dx, dy) {
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

  fillText(size, color, text, dx, dy) {
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

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.screen.width}
        height={this.state.screen.height}
      />
    );
  }
}

export default Canvas;
