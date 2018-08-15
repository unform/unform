import React from 'react'
import PropTypes from 'prop-types'

import FormContext from './context'

const Scope = ({ path, children }) => (
  <FormContext.Consumer>
    {form => (
      <FormContext.Provider
        value={{
          ...form,
          scopePath: form.scopePath ? `${form.scopePath}.${path}` : path
        }}
      >
        {children}
      </FormContext.Provider>
    )}
  </FormContext.Consumer>
)

Scope.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired
}

export default Scope
