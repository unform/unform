import dot from 'dot-object';
import React, {
  forwardRef,
  FormEvent,
  useState,
  DetailedHTMLProps,
  FormHTMLAttributes,
  useImperativeHandle,
  RefObject,
  useCallback,
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
  reset: (data?: object) => void;
}

interface FormContent {
  [key: string]: any;
}

export interface FormRef {
  getFieldValue: (fieldName: string) => any;
  setFieldValue: (fieldName: string, value: any) => void | boolean;
  getFieldError: (fieldName: string) => string;
  setFieldError: (fieldName: string, error: string) => void;
  clearField: (fieldName: string) => void;
  getData(): object;
  getFieldRef: (fieldName: string) => any;
  setData: (data: object) => void;
  getErrors: () => UnformErrors;
  setErrors: (errors: object) => void;
  reset: (data?: object) => void;
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

function Form(
  {
    initialData = {},
    children,
    schema,
    context = {},
    onSubmit,
    ...rest
  }: FormProps,
  formRef: RefObject<FormRef>,
) {
  const [errors, setErrors] = useState<UnformErrors>({});
  const [fields, setFields] = useState<UnformField[]>([]);

  const getFieldByName = useCallback(
    fieldName => fields.find(unformField => unformField.name === fieldName),
    [fields],
  );

  const getFieldValue = useCallback(
    ({ ref, path, parseValue }: UnformField) => {
      const value = dot.pick(path, ref);

      return parseValue ? parseValue(ref) : value;
    },
    [],
  );

  const setFieldValue = useCallback(
    ({ path, ref }: UnformField, value: any) => {
      dot.set(path, value, ref as object);
    },
    [],
  );

  const clearFieldValue = useCallback(
    ({ clearValue, ref, path }: UnformField) => {
      if (clearValue) {
        return clearValue(ref, '');
      }

      return dot.set(path, '', ref as object);
    },
    [],
  );

  const reset = useCallback(
    (data = {}) => {
      fields.forEach(({ name, ref, path, clearValue }) => {
        if (clearValue) {
          return clearValue(ref, data[name]);
        }

        return dot.set(path, data[name] ? data[name] : '', ref as object);
      });
    },
    [fields],
  );

  const setData = useCallback(
    (data: object) => {
      const parsedData = dot.dot(data);

      Object.entries(parsedData).forEach(([fieldName, value]) => {
        const field = getFieldByName(fieldName);

        if (field) {
          setFieldValue(field, value);
        }
      });
    },
    [getFieldByName, setFieldValue],
  );

  const setFormErrors = useCallback(
    (formErrors: object) => {
      const parsedErrors = dot.dot(formErrors);

      setErrors({ ...errors, ...parsedErrors });
    },
    [errors],
  );

  const parseFormData = useCallback(() => {
    const data = {};

    fields.forEach(field => {
      data[field.name] = getFieldValue(field);
    });

    dot.object(data);

    return data;
  }, [fields, getFieldValue]);

  useImperativeHandle(formRef, () => ({
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return getFieldValue(field);
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return setFieldValue(field, value);
    },
    getFieldError(fieldName) {
      return errors[fieldName];
    },
    setFieldError(fieldName, error) {
      setErrors({ ...errors, [fieldName]: error });
    },

    clearField(fieldName) {
      const field = getFieldByName(fieldName);

      if (field) {
        clearFieldValue(field);
      }
    },
    getErrors() {
      return errors;
    },
    setErrors(formErrors) {
      return setFormErrors(formErrors);
    },
    getData() {
      return parseFormData();
    },
    getFieldRef(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return field.ref;
    },
    setData(data) {
      return setData(data);
    },
    reset(data) {
      return reset(data);
    },
  }));

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
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
        onSubmit(data, { reset });
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
    },
    [context, onSubmit, parseFormData, reset, schema],
  );

  const registerField = useCallback((field: UnformField) => {
    setFields(state => [...state, field]);
  }, []);

  const unregisterField = useCallback((fieldName: string) => {
    setFields(state => state.filter(field => field.name !== fieldName));
  }, []);

  return (
    <FormContext.Provider
      value={{
        initialData,
        errors,
        scopePath: '',
        registerField,
        unregisterField,
      }}
    >
      <form {...rest} data-testid="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default forwardRef(Form);
