import React, { useEffect, useRef, useState } from 'react';

import useField from '../useField';

interface Props<T> {
  name: string;
  label?: string;
  multiline?: T;
}

type InputProps = JSX.IntrinsicElements['input'] & Props<false>;
type TextAreaProps = JSX.IntrinsicElements['textarea'] & Props<true>;

export default function Input({
  name,
  label,
  className,
  multiline = false,
  ...rest
}: InputProps | TextAreaProps) {
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    /* istanbul ignore next  */
    if (!ref.current) return;
    registerField({ name: fieldName, ref: ref.current, path: 'value' });
  }, [ref.current, fieldName]);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    className: hasError ? 'has-error' : '',
    defaultValue,
  };

  return (
    <div className={className} role="presentation">
      {label && <label htmlFor={fieldName}>{label}</label>}

      {multiline ? (
        <textarea {...(props as TextAreaProps)} />
      ) : (
        <input {...(props as InputProps)} />
      )}

      {error && <span>{error}</span>}
    </div>
  );
}
