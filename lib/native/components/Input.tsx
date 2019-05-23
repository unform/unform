import React, { useEffect, useRef } from 'react';
import { TextInput, Text } from 'react-native';

import useField from '../../useField';

interface InputProps {
  name: string;
  label?: string;
  multiline?: boolean;
}

export default function Input({
 name, label, multiline = false, ...rest
}: InputProps) {
  const ref = useRef<TextInput>(null);
  const {
 fieldName, registerField, defaultValue, error,
} = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: '_lastNativeText',
        clearValue: ref.current.clear,
      });
    }
  }, [ref.current, fieldName]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    defaultValue,
  };

  return (
    <>
      <TextInput {...props as InputProps} placeholder={label} multiline={multiline} />
      {error && <Text>{error}</Text>}
    </>
  );
}
