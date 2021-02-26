import { useRef, useEffect, TextareaHTMLAttributes } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

/**
 * Textarea component for Unform.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
interface Props {
  name: string
  label?: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

function Textarea({ name, label, ...rest }: TextareaProps) {
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
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}

/**
 * Usage
 */

interface FormData {
  bio: string
}

export default function App() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(data)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Textarea label="Describe yourself" name="bio" />

      <button type="submit">Submit</button>
    </Form>
  )
}
