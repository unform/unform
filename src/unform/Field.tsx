import { pick } from "dot-object";
import React, { useContext, useEffect } from "react";

import FormContext from "./Context";

interface Props {
  name: string;
  label?: string;
}

export default function Field(props: Props) {
  const { name, label } = props;
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

  function register(ref: HTMLInputElement) {
    registerField({ name: fieldName, ref, path: "value" });
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        ref={register}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
      />

      {error && <span>{error}</span>}
    </>
  );
}
