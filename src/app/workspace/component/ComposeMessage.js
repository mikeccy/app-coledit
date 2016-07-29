import Component from 'react-pure-render/component';
import React from 'react';

class ComposeMessage extends Component {
  render() {
    const {
      editingMessage,
      onMessageEditText,
      onMessageEditSubmit,
    } = this.props;

    return <form className="flex flex-row flex-space-between"
        onSubmit={onMessageEditSubmit}>
      <input type="text" name="text" className="flex flex-1"
        value={editingMessage.get('text')} onChange={onMessageEditText} />
      <button className="button-primary" type="submit">发送</button>
    </form>;
  }
}

export default ComposeMessage;
