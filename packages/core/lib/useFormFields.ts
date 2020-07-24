import { useRef, useCallback } from 'react';

import createFieldFactory from './Fields';
import { UnformFields, UnformField } from './types';

const useFormField = () => {
  const fields = useRef<UnformFields>({});

  const getFieldByName = useCallback(
    fieldName => fields.current[fieldName],
    [],
  );

  const registerField = useCallback(
    (field: UnformField) => {
      const fieldExistent = getFieldByName(field.name);

      if (fieldExistent) {
        fieldExistent.addRef(field.ref);
        return;
      }

      fields.current[field.name] = createFieldFactory(field);
    },
    [getFieldByName],
  );

  const unregisterField = useCallback((fieldName: string) => {
    delete fields.current[fieldName];
  }, []);

  return {
    getFieldByName,
    registerField,
    unregisterField,
    fields: fields.current,
  };
};

export default useFormField;
