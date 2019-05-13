import dot from "dot-object";
import React, { FormEvent, useState, FormHTMLAttributes } from "react";
import { ObjectSchema, ValidationError } from "yup";

import FormContext from "./Context";
import { Field, Errors } from "./types";

interface Context {
  [key: string]: any;
}

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  initialData?: object;
  children: React.ReactNode;
  context?: Context;
  schema?: ObjectSchema<object>;
  onSubmit: (data: object) => void;
}

export default function Form({
  initialData = {},
  children,
  schema,
  context = {},
  onSubmit,
  ...rest
}: Props) {
  const [errors, setErrors] = useState<Errors>({});

  let refs: Field[] = [];

  function parseFormData() {
    const data = {};

    refs.forEach(({ name, ref, path }) => {
      const value = typeof ref === "function" ? ref() : ref;

      data[name] = path ? dot.pick(path, value) : value;
    });

    dot.object(data);

    return data;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let data = parseFormData();

    try {
      if (schema) {
        await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
          context
        });

        data = schema.cast(data, {
          stripUnknown: true,
          context
        });
      }

      setErrors({});
      onSubmit(data);
    } catch (err) {
      const validationErrors: Errors = {};

      if (!err.inner) {
        throw err;
      }

      err.inner.forEach((error: ValidationError) => {
        validationErrors[error.path] = error.message;
      });

      setErrors(validationErrors);
    }
  }

  function registerField(field: Field) {
    refs.push(field);
  }

  function unregisterField(name: string) {
    refs = refs.filter(ref => ref.name !== name);
  }

  return (
    <FormContext.Provider
      value={{
        initialData,
        errors,
        scopePath: "",
        registerField,
        unregisterField
      }}
    >
      <form data-testid="form" {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
