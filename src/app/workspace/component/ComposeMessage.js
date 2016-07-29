import Component from 'react-pure-render/component';
import React from 'react';
import FileUploaderContainer from '../container/FileUploaderContainer';

class ComposeMessage extends Component {
  render() {
    const {
      playing,
      editingMessage,
      onMessageEditText,
      onMessageEditStartTs,
      onMessageEditEndTs,
      onMessageEditSubmit,
    } = this.props;

    return <form className="flex flex-row flex-space-between"
        onSubmit={onMessageEditSubmit}>
      <input type="number" disabled={playing} name="startTs" className="flex flex-1" placeholder="起始秒" value={editingMessage.get('startTs') || ''} onChange={onMessageEditStartTs} />
      <input type="number" disabled={playing} name="endTs" className="flex flex-1" placeholder="结束秒" value={editingMessage.get('endTs') || ''} onChange={onMessageEditEndTs} />
      <FileUploaderContainer />
      <input type="text" disabled={playing} name="text" className="flex flex-4" placeholder="评论" value={editingMessage.get('text')} onChange={onMessageEditText} />
      <button className="button-primary" type="submit" disabled={playing}>发送</button>
    </form>;
  }
}

export default ComposeMessage;
