import { useRef, useEffect, ReactNode, SelectHTMLAttributes } from 'react'

import { useField } from '@unform/core'

interface Props {
  name: string
  children: ReactNode
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & Props

export const Select = ({ name, children, ...rest }: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null)

  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: ref => {
        return ref.current?.value
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <select ref={selectRef} name={name} defaultValue={defaultValue} {...rest}>
      {children}
    </select>
  )
}
