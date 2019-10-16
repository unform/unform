import dot from 'dot-object';
import React, {
  FormEvent,
  useState,
  DetailedHTMLProps,
  FormHTMLAttributes,
} from 'react';
import { ObjectSchema, ValidationError } from 'yup';

import FormContext from './Context';
import { UnformErrors, UnformField, Omit } from './types';

type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

interface Context {
  [key: string]: any;
}

interface Helpers {
  resetForm: (data?: object) => void;
}

interface FormContent {
  [key: string]: any;
}

export type SubmitHandler<T = FormContent, Status = any> = (
  data: T,
  helpers: Helpers
) => Status | Promise<Status>;

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: object;
  initialStatus?: any;
  children: React.ReactNode;
  context?: Context;
  schema?: ObjectSchema<object>;
  onSubmit: SubmitHandler;
}

export default function Form({
  initialData = {},
  initialStatus,
  children,
  schema,
  context = {},
  onSubmit,
  ...rest
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<any>(initialStatus);
  const [errors, setErrors] = useState<UnformErrors>({});
  const [fields, setFields] = useState<UnformField[]>([]);

  function parseFormData() {
    const data = {};

    fields.forEach(({ name, ref, path, parseValue }) => {
      const value = dot.pick(path, ref);

      data[name] = parseValue ? parseValue(ref) : value;
    });

    dot.object(data);

    return data;
  }

  function resetForm(data = {}) {
    fields.forEach(({ name, ref, path, clearValue }) => {
      if (clearValue) {
        return clearValue(ref, data[name]);
      }

      return dot.set(path, data[name] ? data[name] : '', ref as object);
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
          context,
        });

        data = schema.cast(data, {
          stripUnknown: true,
          context,
        });
      }

      setErrors({});
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

      return;
    }

    setIsSubmitting(true);

    try {
      setStatus(await onSubmit(data, { resetForm }));
    } catch (err) {
      setStatus(err);
    }

    setIsSubmitting(false);
  }

  function registerField(field: UnformField) {
    setFields(state => [...state, field]);
  }

  function unregisterField(name: string) {
    setFields(state => state.filter(field => field.name !== name));
  }

  return (
    <FormContext.Provider
      value={{
        initialData,
        errors,
        scopePath: '',
        registerField,
        unregisterField,
        status,
        setStatus,
        isSubmitting,
      }}
    >
      <form {...rest} data-testid="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
