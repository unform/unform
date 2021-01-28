import { useEffect, useRef } from 'react'

import { useField } from '../../lib'

interface InputProps {
  name: string
  label?: string
}

interface InputValue {
  id: string
  label: string
}

export function ObjectInput({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField<InputValue>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: HTMLInputElement, value) {
        ref.value = value.id
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        aria-label={fieldName}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}
