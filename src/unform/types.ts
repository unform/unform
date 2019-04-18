export interface Field {
  name: string;
  ref: HTMLInputElement | Function | null;
  path: string;
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
