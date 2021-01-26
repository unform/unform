import { useEffect, useRef, InputHTMLAttributes } from 'react'

import { useField } from '../../lib'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name)

  useEffect(() => {
    registerField<string, HTMLInputElement>({
      name: fieldName,
      ref,
      path: 'value',
    })
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
