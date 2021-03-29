import { RefObject } from 'react'

import '@testing-library/jest-dom/extend-expect.js'

import { FormHandles } from '@unform/core'

import { NumberFormat } from '../lib'
import { render } from './utils/RenderTest'

describe('React Number Format', () => {
  it('should render the input element', () => {
    const { container } = render(<NumberFormat name="price" />)

    expect(!!container.querySelector('input[name=price]')).toBe(true)
    expect(!!container.querySelector('input[inputmode=numeric]')).toBe(true)
  })

  it('should be able to set and get values', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <NumberFormat
          name="creditCard"
          format="#### #### #### ####"
          placeholder="credit"
        />
        <NumberFormat
          name="price"
          value={2456981}
          thousandSeparator
          placeholder="price"
        />
        <NumberFormat name="date" format="##/##" placeholder="MM/YY" />
      </>,
      {
        initialData: { creditCard: '4111111111111111' },
        render: {
          ref: formRef,
        },
      }
    )

    if (formRef.current) {
      formRef.current.setFieldValue('date', '03/00')

      const creditValue = formRef.current.getFieldValue('credit')
      const priceValue = formRef.current.getFieldValue('price')
      const dateValue = formRef.current.getFieldValue('date')

      expect(creditValue).toBe('4111111111111111')
      expect(priceValue).toBe(2456981)
      expect(dateValue).toBe('03/00')
    }
  })

  it('should be able to clear value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <NumberFormat
          name="creditCard"
          format="#### #### #### ####"
          placeholder="credit"
        />
      </>,
      {
        initialData: { creditCard: '4111111111111111' },
        render: {
          ref: formRef,
        },
      }
    )

    if (formRef.current) {
      formRef.current.clearField('credit')

      expect(formRef.current.getFieldValue('credit')).toBe('')

      formRef.current.setFieldValue('credit', '4111111111111111')
      formRef.current.reset()

      expect(formRef.current.getFieldValue('credit')).toBe('')
    }
  })
})
