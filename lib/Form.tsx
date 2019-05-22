import dot from "dot-object";
import React, { FormEvent, useState, CSSProperties } from "react";
import { ObjectSchema, ValidationError } from "yup";

import FormContext from "./Context";
import { UnformErrors, UnformField } from "./types";

interface Context {
  [key: string]: any;
}

interface Helpers {
  resetForm: () => void;
}

interface FormContent {
  [key: string]: any;
}

export interface SubmitHandler<T = FormContent> {
  (data: T, helpers: Helpers): void;
}

export interface FormProps {
  initialData?: object;
  children: React.ReactNode;
  context?: Context;
  className?: string;
  style?: CSSProperties;
  schema?: ObjectSchema<object>;
  onSubmit: SubmitHandler;
}

export default function Form({
  initialData = {},
  children,
  style,
  className,
  schema,
  context = {},
  onSubmit
}: FormProps) {
  const [errors, setErrors] = useState<UnformErrors>({});
  const [fields, setFields] = useState<UnformField[]>([]);

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
      const validationErrors: UnformErrors = {};

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

  function registerField(field: UnformField) {
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
      <form
        data-testid="form"
        style={style}
        className={className}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
