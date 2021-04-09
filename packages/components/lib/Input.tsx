import { InputHTMLAttributes, useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import { registerFields } from './util/registerFields'

/**
 * Input types we can't support yet with this component:
 *
 * - button
 * - image
 * - reset
 * - submit
 */
interface Props {
  name: string
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  value?: string
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const Input = ({ name, type = 'text', value, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  const defaultInputValue = value || defaultValue

  let defaultChecked: boolean | undefined
  if (type === 'checkbox' || type === 'radio') {
    if (Array.isArray(defaultValue)) {
      const containValue = defaultValue.includes(value)
      if (containValue) defaultChecked = true
    } else if (defaultValue === value) {
      defaultChecked = true
    }
  }

  useEffect(() => {
    const registerFieldsKeys = Object.keys(registerFields)
    const hasOnwRegisterKey = registerFieldsKeys.findIndex(el => el === type)
    const { getValue, clearValue, setValue } = registerFields[
      hasOnwRegisterKey !== -1 ? type : 'default'
    ]

    registerField({
      ref: inputRef,
      name: fieldName,
      getValue,
      setValue,
      clearValue,
    })
  }, [fieldName, registerField, type])

  return (
    <input
      ref={inputRef}
      name={fieldName}
      type={type || 'text'}
      defaultValue={defaultInputValue}
      {...(defaultChecked && { defaultChecked })}
      {...rest}
    />
  )
}
