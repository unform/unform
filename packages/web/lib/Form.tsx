import React, { RefForwardingComponent, forwardRef } from 'react';

import {
  Form as Unform,
  FormContext,
  FormHandles,
  FormProps,
} from '@unform/core';

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit, ...rest },
  formRef,
) => {
  return (
    <Unform ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      <FormContext.Consumer>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} {...rest}>
            {children}
          </form>
        )}
      </FormContext.Consumer>
    </Unform>
  );
};

export default forwardRef(Form);
