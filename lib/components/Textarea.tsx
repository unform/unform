import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";

import useField from "../useField";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export default function Textarea({ name, label, ...rest }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: "value" });
    }
  }, [ref.current, fieldName]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        {...rest}
        ref={ref}
        id={fieldName}
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  );
}
