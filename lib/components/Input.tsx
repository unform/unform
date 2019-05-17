import React, { InputHTMLAttributes, useEffect, useRef } from "react";

import useField from "../useField";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  validateOnBlur?: boolean;
}

export default function Input({ name, label, validateOnBlur, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    onBlurValidation
  } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: "value" });
    }
  }, [ref.current, fieldName]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        {...rest}
        ref={ref}
        onBlur={validateOnBlur ? onBlurValidation : undefined}
        id={fieldName}
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  );
}
