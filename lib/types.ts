import { FormEvent } from "react";

export interface Field {
  name: string;
  ref?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  path: string;
  parseValue?: Function;
  clearValue?: Function;
}

export interface Errors {
  [key: string]: string | undefined;
}

export interface Context {
  initialData: object;
  errors: Errors;
  scopePath: string;
  registerField: (field: Field) => void;
  unregisterField: (name: string) => void;
  onBlurValidation: (event: FormEvent) => void;
}
