import { useEffect, useRef } from 'react'

import { useField } from '../../lib'

interface InputProps {
  name: string
  label?: string
}

export function InputWithPath({ name, label, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        aria-label={name}
        id={fieldName}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  )
}
