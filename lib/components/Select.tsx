import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';

import useField from '../useField';

interface Option {
  id: string;
  title: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
}

const defaultProps: Partial<SelectProps> = {
  placeholder: '',
  defaultValue: '',
};

function Select({
  name,
  label,
  placeholder,
  defaultValue,
  options,
  ...rest
}: SelectProps) {
  const ref = useRef<HTMLSelectElement>(null);
  const {
    fieldName,
    registerField,
    defaultValue: initialData,
    error,
  } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: 'value' });
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
        defaultValue={initialData || defaultValue}
        aria-label={fieldName}
        ref={ref}
      >
        <option value={defaultValue} disabled hidden>
          {placeholder}
        </option>
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

Select.defaultProps = defaultProps;

export default Select;
