import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dot from 'dot-object'

import withFieldData from './withFieldData'

class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    registerField: PropTypes.func.isRequired,
    unregisterField: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: null
  }

  componentWillUnmount() {
    const { unregisterField } = this.props

    unregisterField(this.getFieldName())
  }

  registerField = ref => {
    const { registerField } = this.props

    registerField(this.getFieldName(), ref, 'value')
  }

  getFieldName = () => {
    const { scopePath, name } = this.props

    return scopePath ? `${scopePath}.${name}` : name
  }

  getDefaultValue = () => {
    const { initialValues } = this.props

    return dot.pick(this.getFieldName(), initialValues)
  }

  render() {
    const {
      children,
      label,
      registerField,
      unregisterField,
      initialValues,
      scopePath,
      ...props
    } = this.props

    return (
      <Fragment>
        {label && <label htmlFor={props.name}>{label}</label>}
        {children || (
          <input
            {...props}
            id={props.name}
            ref={this.registerField}
            name={this.getFieldName()}
            defaultValue={this.getDefaultValue()}
          />
        )}
      </Fragment>
    )
  }
}

export default withFieldData()(Field)
