import dot from "dot-object";
import React, { FormEvent, useState } from "react";
import * as Yup from "yup";

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
  schema?: Yup.ObjectSchema<object>;
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

      err.inner.forEach((error: Yup.ValidationError) => {
        validationErrors[error.path] = error.message;
      });

      setErrors(validationErrors);
    }
  }

  async function onBlurValidation(
    e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;

    try {
      if (schema) {
        await Yup.reach(schema, name).validate(value);
      }

      setErrors({ ...errors, [name]: undefined });
    } catch (err) {
      setErrors({ ...errors, [name]: err.message });
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
        unregisterField,
        onBlurValidation
      }}
    >
      <form data-testid="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
