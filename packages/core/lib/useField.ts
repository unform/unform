import { useContext, useEffect, useMemo } from 'react';

import dot from 'dot-object';

import FormContext from './Context';
import { UnformContext } from './types';

export default function useField(name: string) {
  const {
    initialData,
    errors,
    scopePath,
    unregisterField,
    registerField,
  } = useContext<UnformContext>(FormContext);

  const fieldName = useMemo(() => {
    return scopePath ? `${scopePath}.${name}` : name;
  }, [name, scopePath]);

  const defaultValue = useMemo(() => {
    return dot.pick(fieldName, initialData);
  }, [fieldName, initialData]);

  const error = useMemo(() => {
    return errors[fieldName];
  }, [errors, fieldName]);

  useEffect(() => () => unregisterField(fieldName), [
    fieldName,
    unregisterField,
  ]);

  return {
    fieldName,
    registerField,
    defaultValue,
    error,
  };
}
