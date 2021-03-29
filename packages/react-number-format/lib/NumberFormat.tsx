import { useRef, useEffect } from 'react'
import ReactNumberFormat, {
  NumberFormatProps as Props,
} from 'react-number-format'

import { useField } from '@unform/core'

export interface NumberFormatProps extends Props {
  name: string
  onError?: (err: any) => void
}

export const NumberFormat = ({ name, value, ...rest }: NumberFormatProps) => {
  const inputRef = useRef<ReactNumberFormat>(null)

  const { fieldName, defaultValue = '', registerField } = useField(name)
  const defaultInputValue = value || defaultValue

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref: any) => {
        const { value } = ref?.current.state
        return value
      },
      clearValue: ref => {
        ref?.current.setState({
          value: '',
          floatValue: '',
          formattedValue: '',
        })
      },
      setValue: (ref, value) => {
        if (value) {
          ref?.current.setState({
            value,
          })
        }
      },
    })
  }, [fieldName, registerField, name])

  return (
    <ReactNumberFormat
      ref={inputRef}
      defaultValue={defaultInputValue}
      name={name}
      {...rest}
    />
  )
}
