import React, { RefForwardingComponent, forwardRef } from 'react';
import { View, ViewProps } from 'react-native';

import { FormProvider, FormHandles, SubmitHandler } from '@unform/core';

export interface FormProps extends ViewProps {
  initialData?: object;
  children: React.ReactNode;
  onSubmit: SubmitHandler;
}

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit, ...rest },
  formRef,
) => {
  return (
    <FormProvider ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      <View {...rest}>{children}</View>
    </FormProvider>
  );
};

export default forwardRef(Form);
