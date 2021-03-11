import { useRef, useEffect } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

/**
 * This input component supports many <input> types, including:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 *  - text
 *  - number
 *  - color
 *  - date
 *  - datetime-local
 *  - email
 *  - hidden
 *  - time
 *  - month
 *  - password
 *  - range
 *  - search
 *  - tel
 *  - url
 *  - week
 *
 * Don't use it with the type `submit` or `reset`; otherwise, bugs will occur.
 */
function Input({ name, type, label, value, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  /**
   * If you add a value to the input, it will be considered the default
   * This is useful when you have a `<input type="hidden" />`
   *
   * You can also remove it and use the `initialData` or set dynamically.
   */
  const defaultInputValue = value || defaultValue

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
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

      <input
        type={type || 'text'}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
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
    console.log(data)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input label="Name" name="name" />
      <Input label="Choose a color" name="color" type="color" />
      <Input label="Choose a number" name="number" type="number" />
      <Input name="secret" type="hidden" value="teste" />
      <Input label="email" name="email" type="email" />
      <Input label="Month" name="month" type="month" min="2020-09" />
      <Input
        label="Telephone"
        name="telephone"
        type="tel"
        placeholder="Ex: XX-XXXXX-XXXX"
        pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
      />
      <Input label="password" name="password" type="password" />
      <Input label="time" name="time" type="time" min="09:00" max="18:00" />
      <Input
        label="website"
        placeholder="https://example.com"
        pattern="https://.*"
        name="website"
        type="url"
      />
      <Input
        label="week"
        min="2021-W01"
        max="2021-W52"
        name="week"
        type="week"
      />
      <Input
        label="date"
        min="2021-01-01"
        max="2021-12-31"
        name="date"
        type="date"
      />
      <Input
        label="meeting-time"
        min="2020-06-07T00:00"
        max="2020-06-14T00:00"
        name="meeting"
        type="datetime-local"
      />
      <Input
        label="search"
        aria-label="Search through site content"
        name="search"
        type="search"
      />
      <Input type="range" name="volume" label="Volume" min="0" max="10" />

      <button type="submit">Submit</button>
    </Form>
  )
}
