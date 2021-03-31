import { useRef, useEffect } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

/**
 * Textarea component for Unform.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
function Textarea({ name, label, rows = 5, cols, ...rest }) {
  const textareaRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  /**
   * If you need to set a default value for the textarea,
   * use the initial data property on your form,
   * or set it dynamically (be aware of the differences).
   *
   * initial data: https://unform.dev/guides/initial-data
   * set field value: https://unform.dev/guides/get-set-field-value
   */

  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        ref={textareaRef}
        id={fieldName}
        defaultValue={defaultValue}
        rows={rows}
        cols={cols}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}

/**
 * Usage
 */
export default function App() {
  const formRef = useRef(null)

  function handleSubmit(data) {
    /**
     * {
     *   bio: 'Pixel perfect Front-end Developer'
     * }
     */
    console.log(data)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Textarea label="Describe yourself" name="bio" />

      <button type="submit">Submit</button>
    </Form>
  )
}
