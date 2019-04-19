import React, { TextareaHTMLAttributes } from "react";

import useField from "../useField";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export default function Textarea({ name, label, ...rest }: Props) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function register(ref: HTMLTextAreaElement) {
    registerField({ name: fieldName, ref, path: "value" });
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        {...rest}
        ref={register}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  );
}
