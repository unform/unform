import { useRef, useEffect } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

/**
 * Select component for Unform (without React Select)
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
function Select({ name, label, children, ...rest }) {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: ref => {
        return ref.current?.value
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>

      <select
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </select>

      {error && <span className="error">{error}</span>}
    </div>
  )
}

/**
 * Usage
 */
export default function App() {
  const formRef = useRef(null)

  const handleSubmit = data => {
    console.log(data)
  }

  const selectOptions = [
    { value: 'brazil', label: 'Brazil' },
    { value: 'usa', label: 'USA' },
    { value: 'argentina', label: 'Argentina' },
  ]

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Select
        name="country"
        label="Choose your country"
        options={selectOptions}
      >
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <button type="submit">Submit</button>
    </Form>
  )
}
