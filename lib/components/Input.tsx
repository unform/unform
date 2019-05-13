import React, { InputHTMLAttributes } from "react";

import useField from "../useField";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export default function Input({ name, label, ...rest }: Props) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function register(ref: HTMLInputElement) {
    registerField({ name: fieldName, ref, path: "value" });
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        {...rest}
        ref={register}
        id={fieldName}
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  );
}
