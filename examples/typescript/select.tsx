import { useRef, useEffect, ReactNode, SelectHTMLAttributes } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

interface SelectProps {
  name: string
  label: string
  children: ReactNode
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & SelectProps

/**
 * Select component for Unform (without React Select)
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
function Select({ name, label, children, ...rest }: Props) {
  const selectRef = useRef<HTMLSelectElement>(null)

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

interface FormData {
  username: string
}

export default function App() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(data)
  }

  const selectOptions = [
    { value: 'brazil', label: 'Brazil' },
    { value: 'usa', label: 'USA' },
    { value: 'argentina', label: 'Argentina' },
  ]

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Select name="country" label="Choose your country">
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
