import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

import { FormProvider, FormHandles, SubmitHandler } from '@unform/core'

export interface FormProps extends ViewProps {
  initialData?: Record<string, any>
  children: ReactNode
  onSubmit: SubmitHandler
}

const FormComponent: ForwardRefRenderFunction<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit, ...rest },
  formRef
) => {
  return (
    <FormProvider ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      <View {...rest}>{children}</View>
    </FormProvider>
  )
}

export const Form = forwardRef(FormComponent)
