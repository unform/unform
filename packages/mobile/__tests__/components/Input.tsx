import React, { useEffect, useRef, memo } from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';

import { useField } from '../../../core/lib';

interface Props {
  name: string;
  label?: string;
}

type InputProps = TextInputProps & Props;

function Input({ name, label, multiline = false, ...rest }: InputProps) {
  const inputRef: any = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      clearValue(ref: any) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref: any, value: string) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref: any) {
        return ref.value;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  const props = {
    ...rest,
    id: fieldName,
    name: fieldName,
    defaultValue,
    multiline,
  };

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput
        ref={inputRef}
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...props}
      />

      {error && <Text>{error}</Text>}
    </>
  );
}

export default memo(Input);
