import { UnformField } from '../types';
import Field from './Field';

function createFieldFactory(field: UnformField) {
  return new Field(field);
}

export default createFieldFactory;
