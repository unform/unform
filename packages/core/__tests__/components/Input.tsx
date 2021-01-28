import { useEffect, useRef, InputHTMLAttributes } from 'react'

import { useField } from '../../lib'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: InputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name)

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: 'value' })
    }
  }, [fieldName, registerField])

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    defaultValue,
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input onFocus={clearError} {...props} />

      {error && <span>{error}</span>}
    </>
  )
}
