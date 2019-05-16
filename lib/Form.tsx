import dot from "dot-object";
import React, { FormEvent, useState } from "react";
import { ObjectSchema, ValidationError } from "yup";

import FormContext from "./Context";
import { Field, Errors } from "./types";

interface Context {
  [key: string]: any;
}

interface Helpers {
  resetForm: () => void;
}

interface Props {
  initialData?: object;
  children: React.ReactNode;
  context?: Context;
  schema?: ObjectSchema<object>;
  onSubmit: (data: object, helpers: Helpers) => void;
}

export default function Form({
  initialData = {},
  children,
  schema,
  context = {},
  onSubmit
}: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [fields, setFields] = useState<Field[]>([]);

  function parseFormData() {
    const data = {};

    fields.forEach(({ name, ref, path, parseValue }) => {
      const value = dot.pick(path, ref);

      data[name] = parseValue ? parseValue(value) : value;
    });

    dot.object(data);

    return data;
  }

  function resetForm() {
    fields.forEach(({ ref, path, clearValue }) => {
      if (clearValue) {
        return clearValue(ref);
      }

      return dot.set(path, "", ref as object);
    });
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
      onSubmit(data, { resetForm });
    } catch (err) {
      const validationErrors: Errors = {};

      /* istanbul ignore next  */
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
    setFields(state => [...state, field]);
  }

  function unregisterField(name: string) {
    setFields(fields.filter(field => field.name !== name));
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
      <form data-testid="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
