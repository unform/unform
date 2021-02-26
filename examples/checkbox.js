import { useEffect, useRef } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

/**
 * This example renders one checkbox. If you want to render multiple options,
 * check the other checkbox example, or adapt this one.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */
function Checkbox({ name, value, label, ...rest }) {
  const inputRef = useRef()
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const defaultChecked = defaultValue === value

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.checked
      },
      clearValue: ref => {
        /**
         * If you want to change the default checked for false or true,
         * you can do so here. In this example, when resetting the form,
         * the checkbox goes back to its initial state.
         */
        ref.current.checked = defaultChecked
      },
      setValue: (ref, value) => {
        ref.current.checked = value
      },
    })
  }, [defaultValue, fieldName, registerField, defaultChecked])

  return (
    <div>
      <input
        defaultChecked={defaultChecked}
        ref={inputRef}
        value={value}
        type="checkbox"
        id={fieldName}
        {...rest}
      />

      <label htmlFor={fieldName} key={fieldName}>
        {label}
      </label>

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
     *   privacy: true || false
     * }
     */
    console.log(data)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Checkbox
        name="privacy"
        value="consent"
        label="I agree with the privacy policy"
      />

      <button type="submit">Submit</button>
    </Form>
  )
}
