import React from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
export interface FormProps {
    initialData?: object;
    children: React.ReactNode;
    onSubmit: SubmitHandler;
}
declare const _default: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormHandles>>;
export default _default;
//# sourceMappingURL=Form.d.ts.map