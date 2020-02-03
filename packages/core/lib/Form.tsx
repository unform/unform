import React, {
  forwardRef,
  FormEvent,
  useState,
  useCallback,
  useImperativeHandle,
  RefForwardingComponent,
} from 'react';

import dot from 'dot-object';

import FormContext from './Context';
import { UnformErrors, UnformField, FormHandles, FormProps } from './types';

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit },
  formRef,
) => {
  const [errors, setErrors] = useState<UnformErrors>({});
  const [fields, setFields] = useState<UnformField[]>([]);

  const getFieldByName = useCallback(
    fieldName => fields.find(unformField => unformField.name === fieldName),
    [fields],
  );

  const getFieldValue = useCallback(({ ref, path, getValue }: UnformField) => {
    if (getValue) {
      return getValue(ref);
    }

    return dot.pick(path, ref);
  }, []);

  const setFieldValue = useCallback(
    ({ path, ref, setValue }: UnformField, value: any) => {
      if (setValue) {
        return setValue(ref, value);
      }

      return dot.set(path, value, ref as object);
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

  const setFormErrors = useCallback((formErrors: object) => {
    const parsedErrors = dot.dot(formErrors);

    setErrors(parsedErrors);
  }, []);

  const parseFormData = useCallback(() => {
    const data = {};

    fields.forEach(field => {
      data[field.name] = getFieldValue(field);
    });

    dot.object(data);

    return data;
  }, [fields, getFieldValue]);

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const data = parseFormData();

      onSubmit(data, { reset });
    },
    [onSubmit, parseFormData, reset],
  );

  const registerField = useCallback((field: UnformField) => {
    setFields(state => [...state, field]);
  }, []);

  const unregisterField = useCallback((fieldName: string) => {
    setFields(state => state.filter(field => field.name !== fieldName));
  }, []);

  useImperativeHandle<{}, FormHandles>(formRef, () => ({
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
    submitForm() {
      handleSubmit();
    },
  }));

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
      {children}
    </FormContext.Provider>
  );
};

export default forwardRef(Form);
