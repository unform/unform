import React, { useEffect, useRef, memo } from 'react';

import { useField } from '../../lib';

interface Props {
  name: string;
  value: string;
  label?: string;
  customClearValue?: boolean;
  customGetValue?: boolean;
  customSetValue?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

function clearValue(refs) {
  refs.forEach(ref => {
    ref.checked = false;
  });
}

function getValue() {
  return 'customGetValue';
}

function setValue(refs) {
  refs.forEach(ref => {
    ref.value === 'customSetValue'
      ? (ref.checked = true)
      : (ref.checked = false);
  });
}

function Input({
  name,
  value,
  label,
  customGetValue,
  customSetValue,
  customClearValue,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        type: 'radio',
        ...(customSetValue && { setValue }),
        ...(customClearValue && { clearValue }),
        ...(customGetValue ? { getValue } : { path: 'value' }),
      });
    }
  }, [
    customClearValue,
    customGetValue,
    customSetValue,
    fieldName,
    registerField,
  ]);

  const props = {
    ...rest,
    ref,
    value,
    name: fieldName,
    'data-testid': value,
    'aria-label': fieldName,
    defaultChecked: defaultValue && defaultValue.includes(value),
  };

  return (
    <>
      {label && <label htmlFor={value}>{label}</label>}

      <input {...(props as InputProps)} />
    </>
  );
}

export default memo(Input);
