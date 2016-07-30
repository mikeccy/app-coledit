import { connect } from 'react-redux';
import { File, fileUploadEnd } from '../action/File';
import FileUploader from '../component/FileUploader';
import { fileService } from '../App';
import { editingMessageAppendFile } from '../action/Message';

const inputProps = (state) => {
  return {
    messages: state.messages,
    clearfile: state.editingMessage.get('files').size <= 0,
  }
}

const outputProps = (dispatch) => {
  return {
    onUploadFinish: (name, url) => {
      fileService.create(new File({
        name,
        url,
      })).then((file) => {
        dispatch(fileUploadEnd(file));
        dispatch(editingMessageAppendFile(file));
      });
    },
  }
}

const FileUploaderContainer = connect(
  inputProps,
  outputProps
)(FileUploader);

export default FileUploaderContainer;
