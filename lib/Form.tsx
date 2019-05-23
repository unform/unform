import dot from 'dot-object';
import React, {
  DetailedHTMLProps,
  FormHTMLAttributes,
  FormEvent,
  useState
} from 'react';
import { ObjectSchema, ValidationError } from 'yup';

import FormContext from './Context';
import { UnformField, UnformErrors, Omit } from './types';

interface Context {
  [key: string]: any;
}

interface Helpers {
  resetForm: () => void;
}

type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

interface FormContent {
  [key: string]: any;
}

export interface SubmitHandler<T = FormContent> {
  (data: T, helpers: Helpers): void;
}

export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: object;
  children: React.ReactNode;
  context?: Context;
  schema?: ObjectSchema<object>;
  onSubmit: SubmitHandler;
}

export default function Form(props: FormProps) {
  const {
    initialData = {},
    children,
    schema,
    context = {},
    onSubmit,
    ...rest
  } = props;

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

      return dot.set(path, '', ref as object);
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
        scopePath: '',
        registerField,
        unregisterField
      }}
    >
      <form {...rest} data-testid="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
