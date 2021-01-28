import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  FormEvent,
  ReactNode,
} from 'react'

interface BaseUnformField<T> {
  name: string
  ref?: any
  setValue?: (ref: any, value: T) => void
  clearValue?: (ref: any, newValue: T) => void
}

export interface PathUnformField<T> extends BaseUnformField<T> {
  path: string
  getValue?: undefined
}

export interface FunctionUnformField<T> extends BaseUnformField<T> {
  path?: undefined
  getValue: (ref: any) => T
}

export type UnformField<T = any> = PathUnformField<T> | FunctionUnformField<T>

export interface UnformErrors {
  [key: string]: string | undefined
}

export interface UnformContext {
  initialData: Record<string, unknown>
  errors: UnformErrors
  scopePath: string
  registerField<T>(field: UnformField<T>): void
  unregisterField: (name: string) => void
  clearFieldError: (fieldName: string) => void
  handleSubmit: (e?: FormEvent) => void
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export interface FormHandles {
  getFieldValue(fieldName: string): any
  setFieldValue(fieldName: string, value: any): void | boolean
  getFieldError(fieldName: string): string | undefined
  setFieldError(fieldName: string, error: string): void
  clearField(fieldName: string): void
  getData(): Record<string, unknown>
  getFieldRef(fieldName: string): any
  setData(data: Record<string, unknown>): void
  getErrors(): UnformErrors
  setErrors(errors: Record<string, string>): void
  reset(data?: Record<string, unknown>): void
  submitForm(): void
}

export interface FormHelpers {
  reset: (data?: Record<string, unknown>) => void
}

export interface SubmitHandler<T = any> {
  (data: T, helpers: FormHelpers, event?: FormEvent): void
}

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: Record<string, unknown>
  children: ReactNode
  onSubmit: SubmitHandler
}
