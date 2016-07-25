import ReactS3Uploader from 'react-s3-uploader';
import { Line } from 'rc-progress';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

const styles = {
  width: 250,
};

class FileUploader extends Component {
  static propTypes = {
    onUploadFinish: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      name: null,
      url: null,
      strokeColor: '',
    };

    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.onUploadError = this.onUploadError.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
  }

  onUploadProgress(percent) {
    this.setState({
      percent,
      strokeColor: '#6599FF',
    });
  }

  onUploadError(message) {
    this.setState({
      percent: 1,
      name: null,
      url: null,
      strokeColor: '#FA2A00',
    });
    alert(message);
  }

  onUploadFinish(signResult, file) {
    this.setState({
      name: file.name,
      url: signResult.publicUrl,
      strokeColor: '#A1F388',
    });
    if (this.props.onUploadFinish) {
      this.props.onUploadFinish(this.state.name, this.state.url);
    }
  }

  render() {
    return (
      <span style={{ display: 'inline-block' }}>
        <div style={styles}>
          <Line
            percent={this.state.percent}
            strokeWidth="5"
            strokeColor={this.state.strokeColor}
          />
        </div>
        <ReactS3Uploader
          style={styles}
          signingUrl="/s3/sign"
          accept="image/*"
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          signingUrlHeaders={{ additional: this.headers }}
          signingUrlQueryParams={{ additional: this.queryParams }}
          uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
          contentDisposition="auto"
        />
      </span>
    );
  }
}

export default FileUploader;
