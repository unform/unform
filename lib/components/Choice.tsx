import React, { Fragment, useEffect, useRef } from 'react';

import useField from '../useField';

interface Option {
  id: string;
  label?: string;
}

interface Props {
  name: string;
  options: Option[];
  multiple?: boolean;
}

type ChoiceProps = JSX.IntrinsicElements['input'] & Props;

export default function Choice({
 name, options, multiple, ...rest
}: ChoiceProps) {
  const {
 fieldName, registerField, defaultValue, error,
} = useField(name);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const localRefs = options.map(() => useRef<HTMLInputElement>(null));

  const threatAsCheckbox = !!(multiple || options.length === 1);
  const nativeField = threatAsCheckbox ? 'checkbox' : 'radio';

  function getValues(refs: HTMLInputElement[]) {
    const values = refs.filter(r => r.checked).map(f => f.value);
    if (options.length === 1 || !threatAsCheckbox) return values[0] || undefined;
    return values.length > 0 ? values : undefined;
  }

  function checked(id: string): boolean {
    if (!defaultValue) return false;
    if (typeof defaultValue === 'string') return [defaultValue].includes(id);
    return Array.from(defaultValue).includes(id);
  }

  useEffect(() => {
    const allRefs = localRefs.filter(r => r.current != null);
    if (localRefs.length > 0 && localRefs.length === allRefs.length) {
      registerField({
        name: fieldName,
        path: 'optional?',
        ref: allRefs.map(r => r.current),
        getValues,
      });
    }
  }, [fieldName]);

  return (
    <Fragment>
      {options.map(({ id, label }, idx) => {
        const checkboxId = `${fieldName}-${id}`;
        return (
          <Fragment key={checkboxId}>
            <input
              {...rest}
              ref={localRefs[idx]}
              type={nativeField}
              id={checkboxId}
              name={fieldName}
              aria-label={checkboxId}
              value={id}
              defaultChecked={checked(id)}
            />
            {label && <label htmlFor={checkboxId}>{label}</label>}
          </Fragment>
        );
      })}
      {error && <span>{error}</span>}
    </Fragment>
  );
}
