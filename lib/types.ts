import { TextInput } from 'react-native';

interface AtomicField {
  name: string;
  path: string;
  ref?: object;
  parseValue?: Function;
  clearValue?: Function;
}
export interface UnformField extends AtomicField {
  ref?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
}

export interface UnformNativeField extends AtomicField {
  ref?: TextInput;
}

export interface UnformErrors {
  [key: string]: string;
}

export interface UnformContext {
  initialData: object;
  errors: UnformErrors;
  scopePath: string;
  registerField: (field: UnformField | UnformNativeField) => void;
  unregisterField: (name: string) => void;
  handleSubmit?: () => void;
}
