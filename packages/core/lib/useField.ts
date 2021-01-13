import { useContext, useEffect, useMemo, useCallback } from 'react';

import FormContext from './Context';
import { UnformContext } from './types';
import { getIn } from './utils';

export default function useField(name: string) {
  const {
    initialData,
    errors,
    scopePath,
    unregisterField,
    registerField,
    clearFieldError,
  } = useContext<UnformContext>(FormContext);

  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  const fieldName = useMemo(() => {
    return scopePath ? `${scopePath}.${name}` : name;
  }, [name, scopePath]);

  const defaultValue = useMemo(() => {
    return getIn(initialData, fieldName);
  }, [fieldName, initialData]);

  const error = useMemo(() => {
    return errors[fieldName];
  }, [errors, fieldName]);

  const clearError = useCallback(() => {
    clearFieldError(fieldName);
  }, [clearFieldError, fieldName]);

  useEffect(() => () => unregisterField(fieldName), [
    fieldName,
    unregisterField,
  ]);

  return {
    fieldName,
    registerField,
    defaultValue,
    clearError,
    error,
  };
}
