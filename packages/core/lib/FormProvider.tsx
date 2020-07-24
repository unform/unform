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
import { UnformErrors, FormHandles, FormProps } from './types';
import useFormFields from './useFormFields';

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit },
  formRef,
) => {
  const [errors, setErrors] = useState<UnformErrors>({});
  const {
    fields,
    getFieldByName,
    registerField,
    unregisterField,
  } = useFormFields();

  const reset = useCallback(
    (data = {}) => {
      Object.keys(fields).forEach(fieldName => {
        return fields[fieldName].clearValue(
          data[fieldName] ? data[fieldName] : '',
        );
      });
    },
    [fields],
  );

  const setData = useCallback(
    (data: object) => {
      const fieldValue = {};

      Object.keys(fields).forEach(fieldName => {
        fieldValue[fieldName] = dot.pick(fieldName, data);
      });

      Object.entries(fieldValue).forEach(([fieldName, value]) => {
        fields[fieldName].setValue(value);
      });
    },
    [fields],
  );

  const setFormErrors = useCallback((formErrors: object) => {
    const parsedErrors = dot.dot(formErrors);

    setErrors(parsedErrors);
  }, []);

  const parseFormData = useCallback(() => {
    const data = {};

    Object.entries(fields).forEach(([fieldName, field]) => {
      data[fieldName] = field.getValue();
    });

    dot.object(data);

    return data;
  }, [fields]);

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      const data = parseFormData();

      onSubmit(data, { reset }, event);
    },
    [onSubmit, parseFormData, reset],
  );

  useImperativeHandle<{}, FormHandles>(formRef, () => ({
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return field.getValue();
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return field.setValue(value);
    },
    getFieldError(fieldName) {
      return errors[fieldName];
    },
    setFieldError(fieldName, error) {
      setErrors(state => ({ ...state, [fieldName]: error }));
    },
    clearField(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return field.clearValue();
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

      return field.getRef();
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
        setErrors,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default forwardRef(Form);
