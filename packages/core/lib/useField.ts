import { useContext, useEffect } from 'react';

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

  const fieldName = scopePath ? `${scopePath}.${name}` : name;

  useEffect(() => () => unregisterField(fieldName), [
    fieldName,
    unregisterField,
  ]);

  const defaultValue = dot.pick(fieldName, initialData);
  const error = errors[fieldName];

  return {
    fieldName,
    registerField,
    defaultValue,
    error,
  };
}
