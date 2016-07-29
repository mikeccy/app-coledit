import { Base } from './Base';

export class File extends Base({
  name: '',
  url: '',
  userId: undefined,
  updatedAt: undefined,
}) {
  cacheInMemory() {
    return this.get('isEditing');
  }
}

export const fileUploadEnd = (file) => {
  return {
    type: 'FILE_UPLOAD_END',
    file,
  }
}
