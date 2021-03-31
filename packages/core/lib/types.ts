import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  FormEvent,
  RefObject,
  ReactNode,
} from 'react'

interface BaseUnformField<T, U> {
  name: string
  ref: RefObject<U>
  setValue?: (ref: RefObject<U>, value: T) => void
  clearValue?: (ref: RefObject<U>, newValue: T) => void
}

export interface PathUnformField<T, U> extends BaseUnformField<T, U> {
  path: string
  getValue?: undefined
}

export interface FunctionUnformField<T, U> extends BaseUnformField<T, U> {
  path?: undefined
  getValue: (ref: RefObject<U>) => T
}

export type UnformField<T = any, U = any> =
  | PathUnformField<T, U>
  | FunctionUnformField<T, U>

export interface UnformErrors {
  [key: string]: string | undefined
}

export interface UnformContext {
  initialData: object
  errors: UnformErrors
  scopePath: string
  registerField<T = any, U = any>(field: UnformField<T, U>): void
  unregisterField: (name: string) => void
  clearFieldError: (fieldName: string) => void
  handleSubmit: (e?: FormEvent) => void
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export interface FormHandles<T = any, U = any> {
  getFieldValue(fieldName: string): T
  setFieldValue(fieldName: string, value: T): void
  getFieldError(fieldName: string): string | undefined
  setFieldError(fieldName: string, error: string): void
  clearField(fieldName: string): void
  getData(): object
  getFieldRef(fieldName: string): RefObject<U> | undefined
  setData(data: object): void
  getErrors(): UnformErrors
  setErrors(errors: object): void
  reset(data?: object): void
  submitForm(): void
}

export interface FormHelpers {
  reset: (data?: Record<string, any>) => void
}

export interface SubmitHandler<T = any> {
  (data: T, helpers: FormHelpers, event?: FormEvent): void
}

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: Record<string, any>
  children: ReactNode
  onSubmit: SubmitHandler
}
