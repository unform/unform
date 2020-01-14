import { DetailedHTMLProps, FormHTMLAttributes, FormEvent } from 'react';

export interface UnformField {
  name: string;
  ref?: any;
  path: string;
  setValue?: Function;
  getValue?: Function;
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
  handleSubmit: (e?: FormEvent) => void;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
export interface FormHandles {
  getFieldValue(fieldName: string): any;
  setFieldValue(fieldName: string, value: any): void | boolean;
  getFieldError(fieldName: string): string;
  setFieldError(fieldName: string, error: string): void;
  clearField(fieldName: string): void;
  getData(): object;
  getFieldRef(fieldName: string): any;
  setData(data: object): void;
  getErrors(): UnformErrors;
  setErrors(errors: object): void;
  reset(data?: object): void;
  submitForm(): void;
}

export interface FormHelpers {
  reset: (data?: object) => void;
}

export interface FormContent {
  [key: string]: any;
}

export interface SubmitHandler<T = FormContent> {
  (data: T, helpers: FormHelpers): void;
}

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: object;
  children: React.ReactNode;
  onSubmit: SubmitHandler;
}
