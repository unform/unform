import React, { RefForwardingComponent, forwardRef } from 'react';

import { Form as Unform, FormHandles, FormProps } from '@unform/core';

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
