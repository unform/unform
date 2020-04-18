import { DetailedHTMLProps, FormHTMLAttributes, FormEvent } from 'react';

interface BaseUnformField<T> {
  name: string;
  ref?: any;
  setValue?: (ref: any, value: T) => void;
  clearValue?: (ref: any, newValue: T) => void;
}

export interface PathUnformField<T> extends BaseUnformField<T> {
  path: string;
  getValue?: undefined;
}

export interface FunctionUnformField<T> extends BaseUnformField<T> {
  path?: undefined;
  getValue: (ref: any) => T;
}

export type UnformField<T = any> = PathUnformField<T> | FunctionUnformField<T>;

export interface UnformErrors {
  [key: string]: string | undefined;
}

export interface UnformContext {
  initialData: object;
  errors: UnformErrors;
  scopePath: string;
  registerField<T>(field: UnformField<T>): void;
  unregisterField: (name: string) => void;
  clearFieldError: (fieldName: string) => void;
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
  getFieldError(fieldName: string): string | undefined;
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

export interface SubmitHandler<T = any> {
  (data: T, helpers: FormHelpers, event?: FormEvent): void;
}

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: object;
  children: React.ReactNode;
  onSubmit: SubmitHandler;
}
