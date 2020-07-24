import { UnformField } from '../types';
import Field from './Field';
import RadioField from './RadioField';

function createFieldFactory(field: UnformField) {
  switch (field.type) {
    case 'radio':
      return new RadioField(field);
    default:
      return new Field(field);
  }
}

export default createFieldFactory;
