import { useEffect, useRef, InputHTMLAttributes, RefObject } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

/**
 * This is a Radio component that supports rendering multiple options.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */
interface Props {
  name: string
  label?: string
  options: {
    id: string
    value: string
    label: string
  }[]
}

type RefInputEl = RefObject<HTMLInputElement[]>

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

function Radio({ name, label, options, ...rest }: InputProps) {
  const inputRefs = useRef([])
  const { fieldName, registerField, defaultValue = '', error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs: RefInputEl) => {
        return refs.current.find(input => input?.checked)?.value
      },
      setValue: (refs: RefInputEl, id: string) => {
        const inputRef = refs.current.find(ref => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: (refs: RefInputEl) => {
        const inputRef = refs.current.find(ref => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      {label && <p>{label}</p>}

      {options.map((option, index) => (
        <span key={option.id}>
          <input
            type="radio"
            ref={ref => {
              inputRefs.current[index] = ref
            }}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />

          <label htmlFor={option.id} key={option.id}>
            {option.label}
          </label>
        </span>
      ))}

      {error && <span>{error}</span>}
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

  const radioOptions = [
    { id: 'jpedroschmitz', value: 'jpedroschmitz', label: 'jpedroschmitz' },
    { id: 'rocketseat', value: 'rocketseat', label: 'Rocketseat' },
  ]

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Radio name="username" label="Choose a username" options={radioOptions} />

      <button type="submit">Submit</button>
    </Form>
  )
}
