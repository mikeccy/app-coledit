import { Record } from 'immutable';

export const Base = (defaultValues) => class extends Record({
  _id: undefined,
  ...defaultValues
}) {
  isNew() {
    return this.get('_id') === undefined;
  }
};
