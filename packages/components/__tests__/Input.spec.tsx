import { RefObject } from 'react'

import '@testing-library/jest-dom/extend-expect.js'

import { FormHandles } from '../../core/lib'
import { Input } from '../lib'
import { render } from './utils/RenderTest'

describe('Input', () => {
  it('should render the component', () => {
    const { container } = render(<Input name="name" />)

    expect(!!container.querySelector('input[name=name]')).toBe(true)
  })

  it('should be abe to load the initial data', () => {
    const { container } = render(<Input name="name" />, {
      initialData: { name: 'João Pedro' },
    })

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'João Pedro'
    )
  })

  it('should be able to set the field value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText } = render(
      <>
        <Input name="name" aria-label="name-input" />
      </>,
      {
        ref: formRef,
      }
    )

    const name = 'João Pedro'

    if (formRef.current) {
      formRef.current.setFieldValue('name', name)
    }

    expect((getByLabelText('name-input') as HTMLInputElement).value).toBe(name)
  })

  it('should be able to get the field value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
      </>,
      {
        ref: formRef,
        initialData: { name: 'John Doe' },
      }
    )

    if (formRef.current) {
      const value = formRef.current.getFieldValue('name')

      expect(value).toBe('John Doe')
    }
  })

  it('should be able to clear the input value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText } = render(
      <>
        <Input name="name" aria-label="name-input" />
      </>,
      {
        ref: formRef,
        initialData: { name: 'João' },
      }
    )

    if (formRef.current) {
      formRef.current.clearField('name')
    }

    expect((getByLabelText('name-input') as HTMLInputElement).value).toBe('')
  })
})
