import * as React from 'react'
import PropTypes from 'prop-types'
import dot from 'dot-object'

import FormContext from './context'

export default class Form extends React.Component {
  fieldRefs = []

  static propTypes = {
    initialValues: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
      PropTypes.func
    ]).isRequired
  }

  static defaultProps = {
    initialValues: {}
  }

  state = {
    isSubmitting: false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  parseFormData = () => {
    const data = {}

    this.fieldRefs.forEach(({ name, ref, path }) => {
      data[name] = dot.pick(path, typeof ref === 'function' ? ref() : ref)
    })

    return dot.object(data)
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { onSubmit } = this.props
    const data = this.parseFormData()

    this.setState({ isSubmitting: true })

    try {
      await onSubmit(data)
    } catch (err) {
      this.handleErrors(err)
    } finally {
      if (this.mounted) {
        this.setState({ isSubmitting: false })
      }
    }
  }

  handleErrors = err => {
    // TODO: Global/validation error handler
    console.warn(err)
  }

  registerField = (name, ref, path) => {
    this.fieldRefs.push({ name, ref, path })
  }

  unregisterField = name => {
    this.fieldRefs = this.fieldRefs.filter(ref => ref.name !== name)
  }

  render() {
    const { initialValues, children } = this.props
    const { registerField, unregisterField } = this

    return (
      <FormContext.Provider
        value={{
          initialValues,
          registerField,
          unregisterField,
          scopePath: ''
        }}
      >
        <form onSubmit={this.handleSubmit}>
          {typeof children === 'function' ? children(this.state) : children}
        </form>
      </FormContext.Provider>
    )
  }
}
