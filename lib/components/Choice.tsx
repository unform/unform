import React, { Fragment, InputHTMLAttributes, useState } from "react";

import useField from "../useField";

interface Option {
  id: string;
  label?: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: Option[];
  multiple?: boolean;
}

export default function Choice(props: Props) {
  const { name, options, multiple, ...rest } = props;
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState<string | string[]>(defaultValue);

  const threatAsCheckbox = !!(multiple || options.length === 1);
  const nativeField = threatAsCheckbox ? "checkbox" : "radio";

  function getValue() {
    if (multiple)
      return Array.from(value || []).length === 0 ? undefined : value;
    return value === "" ? undefined : value;
  }

  registerField({ name: fieldName, ref: getValue });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked: toAdd, value: fieldVal } = e.target;
    if (multiple) {
      const newVal = toAdd
        ? [...Array.from(value || []), fieldVal]
        : Array.from(value).filter(v => v !== e.target.value);
      setValue(newVal);
    } else {
      setValue(toAdd ? fieldVal : "");
    }
  }

  function checked(val: string) {
    if (multiple) {
      return Array.from(value || []).includes(val);
    }
    return value === val;
  }

  return (
    <>
      {options.map(option => {
        const checkboxId = `${fieldName}-${option.id}`;
        return (
          <Fragment key={checkboxId}>
            <input
              {...rest}
              type={nativeField}
              id={checkboxId}
              name={fieldName}
              aria-label={checkboxId}
              onChange={handleChange}
              value={option.id}
              checked={checked(option.id)}
            />
            {option.label && <label htmlFor={checkboxId}>{option.label}</label>}
          </Fragment>
        );
      })}

      {error && <span>{error}</span>}
    </>
  );
}
