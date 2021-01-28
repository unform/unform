import { useEffect, useRef, memo } from 'react'
import { TextInput, TextInputProps, Text } from 'react-native'

import { useField } from '../../../core/lib'

interface Props {
  name: string
  label?: string
}

type InputProps = TextInputProps & Props

interface InputValueReference {
  value: string
}

function Input({ name, label, multiline = false, ...rest }: InputProps) {
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const inputElementRef = useRef<any>(null)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref, value: string) {
        ref.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue(ref) {
        ref.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [defaultValue, fieldName, registerField])

  const props = {
    ...rest,
    id: fieldName,
    name: fieldName,
    defaultValue,
    multiline,
  }

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput
        {...props}
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
      />

      {error && <Text>{error}</Text>}
    </>
  )
}

export default memo(Input)
