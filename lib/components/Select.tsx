import classNames from 'classnames';
import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  className,
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
  const value = (ref.current && ref.current.value) || defaultValue;
  const hasInitialValue = value === defaultValue;
  const [isEmpty, setIsEmpty] = useState<boolean>(hasInitialValue);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    /* istanbul ignore next  */
    if (!ref.current) return;
    registerField({ name: fieldName, ref: ref.current, path: 'value' });
  }, [ref.current, fieldName]);

  useEffect(() => {
    /* istanbul ignore next  */
    if (!ref.current) return;
    ref.current.addEventListener(
      'change',
      () => {
        setIsEmpty(false);
      },
      { once: true }
    );
  }, [ref.current]);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  return (
    <div className={className} role="presentation">
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        {...rest}
        id={fieldName}
        name={fieldName}
        aria-label={fieldName}
        defaultValue={initialData || defaultValue}
        className={classNames({
          'is-empty': isEmpty,
          'has-error': hasError,
        })}
        multiple={false}
        ref={ref}
      >
        <option className="placeholder" value={defaultValue} disabled hidden>
          {placeholder}
        </option>
        {options.map(({ id, title }: Option) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>

      {error && <span>{error}</span>}
    </div>
  );
}

Select.defaultProps = defaultProps;

export default Select;
