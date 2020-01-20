import React, { RefForwardingComponent, forwardRef } from 'react';

import { Form as Unform, FormHandles, SubmitHandler } from '@unform/core';

export interface FormProps {
  initialData?: object;
  children: React.ReactNode;
  onSubmit: SubmitHandler;
}

const Form: RefForwardingComponent<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit },
  formRef,
) => {
  return (
    <Unform ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      {children}
    </Unform>
  );
};

export default forwardRef(Form);
