import { UnformField } from '../types';
import CheckboxField from './CheckboxField';
import Field from './Field';
import RadioField from './RadioField';

function createFieldFactory<T>(field: UnformField<T>) {
  switch (field.type) {
    case 'checkbox':
      return new CheckboxField<T[]>(field);
    case 'radio':
      return new RadioField<T>(field);
    default:
      return new Field<T>(field);
  }
}

export default createFieldFactory;
