export interface Field {
  name: string;
  ref?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  getValue?: () => any;
  setValue?: (value: any) => any;
  path?: string;
}

export interface Errors {
  [key: string]: string;
}

export interface Context {
  initialData: object;
  errors: Errors;
  scopePath: string;
  registerField: (field: Field) => void;
  unregisterField: (name: string) => void;
}
