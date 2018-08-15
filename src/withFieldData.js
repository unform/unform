import React from 'react'
// import { pick } from 'dot-object'

import FormContext from './context'

// defaultValue={pick(name, form.initialValues)}

export default function withFieldData() {
  return WrappedComponent => props => (
    <FormContext.Consumer>
      {form => <WrappedComponent {...props} {...form} />}
    </FormContext.Consumer>
  )
}
