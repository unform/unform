import { TextareaHTMLAttributes, useRef, useEffect } from 'react'

import { useField } from '@unform/core'

interface Props {
  name: string
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

export const Textarea = ({ name, ...rest }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <textarea
      ref={textareaRef}
      id={fieldName}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}
