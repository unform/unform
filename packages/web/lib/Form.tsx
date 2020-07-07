import React, { RefForwardingComponent, forwardRef } from 'react';

import {
  FormProvider,
  FormContext,
  FormHandles,
  FormProps,
} from '@unform/core';

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit, ...rest },
  formRef,
) => {
  return (
    <FormProvider ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      <FormContext.Consumer>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} {...rest}>
            {children}
          </form>
        )}
      </FormContext.Consumer>
    </FormProvider>
  );
};

export default forwardRef(Form);
