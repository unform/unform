import { InputHTMLAttributes, useEffect, useRef } from 'react'

import { useField } from '../../lib'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function CustomInputClear({ name, label, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    if (ref.current) {
      registerField<string, HTMLInputElement>({
        name: fieldName,
        ref,
        path: 'value',
        clearValue: inputRef => {
          if (inputRef.current) {
            inputRef.current.value = 'test'
          }
        },
      })
    }
  }, [fieldName, registerField])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        {...rest}
        ref={ref}
        id={fieldName}
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  )
}
