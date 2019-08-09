import React, { Fragment, useEffect, useRef } from 'react';

import useField from '../useField';

interface OptionProps {
  value: string;
  label?: string;
}

interface Props {
  name: string;
  options: OptionProps[];
  multiple?: boolean;
}

type ChoiceProps = JSX.IntrinsicElements['input'] & Props;

export default function Choice({
  name,
  options,
  multiple,
  ...rest
}: ChoiceProps) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const ref = useRef<HTMLInputElement[] | null[]>([]);

  const nativeField = multiple ? 'checkbox' : 'radio';

  const checked = (value: string): boolean => {
    if (!defaultValue) return false;
    if (typeof defaultValue === 'string') return [defaultValue].includes(value);
    return Array.from(defaultValue).includes(value);
  };

  const parseValue = (choiceRef: HTMLInputElement[]) => {
    const values = choiceRef.filter(i => i.checked).map(i => i.value);
    return multiple ? values : values[0];
  };

  useEffect(() => {
    ref.current = ref.current.slice(0, options.length);
    registerField({
      name: fieldName,
      path: '',
      ref: ref.current,
      parseValue,
      clearValue: (choiceRef: HTMLInputElement[]) => {
        choiceRef.forEach(i => {
          i.checked = false;
        });
      },
    });
  }, [fieldName]);

  return (
    <Fragment>
      {options.map(({ value, label }, idx) => {
        const checkboxId = `${fieldName}-${value}`;
        return (
          <Fragment key={checkboxId}>
            <input
              {...rest}
              ref={el => {
                ref.current[idx] = el;
              }}
              type={nativeField}
              id={checkboxId}
              name={fieldName}
              aria-label={checkboxId}
              value={value}
              defaultChecked={checked(value)}
            />
            {label && <label htmlFor={checkboxId}>{label}</label>}
          </Fragment>
        );
      })}
      {error && <span>{error}</span>}
    </Fragment>
  );
}
