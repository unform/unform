export interface UnformField {
  name: string;
  ref?:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | HTMLInputElement[]
    | null[];
  path: string;
  parseValue?: Function;
  clearValue?: Function;
}

export interface UnformErrors {
  [key: string]: string;
}

export interface UnformContext {
  initialData: object;
  errors: UnformErrors;
  scopePath: string;
  registerField: (field: UnformField) => void;
  unregisterField: (name: string) => void;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
