import React, {
  forwardRef,
  FormEvent,
  useState,
  useRef,
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
  const fields = useRef<UnformField[]>([]);

  const getFieldByName = useCallback(
    fieldName =>
      fields.current.find(unformField => unformField.name === fieldName),
    [],
  );

  const getFieldValue = useCallback(({ ref, getValue, path }: UnformField) => {
    if (getValue) {
      return getValue(ref);
    }

    return path && dot.pick(path, ref);
  }, []);

  const setFieldValue = useCallback(
    ({ path, ref, setValue }: UnformField, value: any) => {
      if (setValue) {
        return setValue(ref, value);
      }

      return path ? dot.set(path, value, ref as object) : false;
    },
    [],
  );

  const clearFieldValue = useCallback(
    ({ clearValue, ref, path }: UnformField) => {
      if (clearValue) {
        return clearValue(ref, '');
      }

      return path && dot.set(path, '', ref as object);
    },
    [],
  );

  const reset = useCallback((data = {}) => {
    fields.current.forEach(({ name, ref, path, clearValue }) => {
      if (clearValue) {
        return clearValue(ref, data[name]);
      }

      return path && dot.set(path, data[name] ? data[name] : '', ref as object);
    });
  }, []);

  const setData = useCallback(
    (data: object) => {
      const fieldValue = {};

      fields.current.forEach(field => {
        fieldValue[field.name] = dot.pick(field.name, data);
      });

      Object.entries(fieldValue).forEach(([fieldName, value]) => {
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

    fields.current.forEach(field => {
      data[field.name] = getFieldValue(field);
    });

    dot.object(data);

    return data;
  }, [getFieldValue]);

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

  const registerField = useCallback((field: UnformField) => {
    fields.current.push(field);
  }, []);

  const unregisterField = useCallback((fieldName: string) => {
    const fieldIndex = fields.current.findIndex(
      field => field.name === fieldName,
    );

    if (fieldIndex > -1) {
      fields.current.splice(fieldIndex, 1);
    }
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(state => ({ ...state, [fieldName]: undefined }));
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
      setErrors(state => ({ ...state, [fieldName]: error }));
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
        clearFieldError,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default forwardRef(Form);
