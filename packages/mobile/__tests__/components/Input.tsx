import React, { useEffect, useRef, memo } from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';

import { useField } from '@unform/core';

interface Props {
  name: string;
  label?: string;
}

type InputProps = TextInputProps & Props;

function Input({ name, label, multiline = false, ...rest }: InputProps) {
  const ref = useRef<TextInput>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: '_lastNativeText',
        getValue(inputRef: any) {
          return inputRef._lastNativeText;
        },
        setValue(inputRef: any, text: string) {
          inputRef.setNativeProps({ text });
          inputRef._lastNativeText = text;
        },
      });
    }
  }, [fieldName, registerField]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    value: defaultValue,
    multiline,
  };

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput ref={ref} {...props} />

      {error && <Text>{error}</Text>}
    </>
  );
}

export default memo(Input);
