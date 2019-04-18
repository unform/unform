import { pick } from "dot-object";
import { useContext, useEffect } from "react";

import FormContext from "./Context";

export default function useField(name: string) {
  const {
    initialData,
    errors,
    scopePath,
    unregisterField,
    registerField
  } = useContext(FormContext);

  const fieldName = scopePath ? `${scopePath}.${name}` : name;
  const defaultValue = pick(fieldName, initialData);
  const error = errors[fieldName];

  useEffect(() => {
    return () => unregisterField(fieldName);
  }, []);

  return {
    fieldName,
    registerField,
    defaultValue,
    error
  };
}
