import React, {
  SelectHTMLAttributes,
  useState,
  useEffect,
  useRef,
  useImperativeHandle
} from "react";

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
  const ref = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState<string | string[]>();

  function getValue() {
    return value;
  }

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, getValue, ref: ref.current });
    }
  }, [ref]);

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
        ref={ref}
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
