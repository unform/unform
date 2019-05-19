import React, { SelectHTMLAttributes, useEffect, useRef } from "react";

import useField from "../useField";

interface Option {
  id: string;
  title: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: Option[];
}

export default function Select({ name, label, options, ...rest }: Props) {
  const ref = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: "value" });
    }
  }, [ref.current, fieldName]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        {...rest}
        multiple={false}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        aria-label={fieldName}
        ref={ref}
      >
        <option value="">Selecione...</option>
        {options.map(({ id, title }: Option) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>

      {error && <span>{error}</span>}
    </>
  );
}
