import dot from 'dot-object';
import React, { useState } from 'react';
import { ViewStyle, View } from 'react-native';
import { ObjectSchema, ValidationError } from 'yup';

import FormContext from '../Context';
import { UnformErrors, UnformNativeField } from '../types';

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
  style?: ViewStyle;
  schema?: ObjectSchema<object>;
  onSubmit: SubmitHandler;
}

export default function Form({
  initialData = {},
  children,
  style,
  schema,
  context = {},
  onSubmit,
}: FormProps) {
  const [errors, setErrors] = useState<UnformErrors>({});
  const [fields, setFields] = useState<UnformNativeField[]>([]);

  function parseFormData() {
    const data = {};

    fields.forEach(({
 name, ref, path, parseValue,
}) => {
      let value = dot.pick(path, ref);
      if (!value) {
        value = dot.pick('props.defaultValue', ref);
      }

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

  async function handleSubmit() {
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

  function registerField(field: UnformNativeField) {
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
        unregisterField,
        handleSubmit,
      }}
    >
      <View testID="form" style={style}>
        {children}
      </View>
    </FormContext.Provider>
  );
}
