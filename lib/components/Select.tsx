import React, { SelectHTMLAttributes, useState, useEffect } from "react";

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

export default function Select({
  name,
  label,
  options,
  multiple,
  ...rest
}: Props) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState<string | string[]>();

  useEffect(() => {
    if (defaultValue) {
      if (multiple) {
        const selectValue = Array.from(defaultValue).map((o: string) => o);

        setValue(selectValue);
      } else {
        setValue(defaultValue);
      }
    }
  }, [defaultValue]);

  function getValue() {
    return value;
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (multiple) {
      const selectValue = Array.from(e.target.options)
        .filter(o => o.selected)
        .map(o => o.value);

      setValue(selectValue);
    } else {
      setValue(e.target.value);
    }
  }

  function register() {
    registerField({ name: fieldName, ref: getValue });
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        {...rest}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        onChange={handleChange}
        multiple={multiple}
        aria-label={fieldName}
        ref={register}
      >
        {!multiple && <option value="">Selecione...</option>}
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
