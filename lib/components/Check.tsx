import React, { useEffect, useRef } from 'react';

import useField from '../useField';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export default function Input({ name, label, ...rest }: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const parseValue = (inputRef: HTMLInputElement) => inputRef.checked;

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: '',
        parseValue,
        clearValue: (inputRef: HTMLInputElement) => {
          inputRef.checked = false;
        },
      });
    }
  }, [ref.current, fieldName]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    type: 'checkbox',
    'aria-label': fieldName,
    defaultChecked: defaultValue,
  };

  return (
    <>
      <input {...props as InputProps} />

      {label && <label htmlFor={fieldName}>{label}</label>}

      {error && <span>{error}</span>}
    </>
  );
}
