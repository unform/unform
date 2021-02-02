import { ReactNode } from 'react'

import { render as rtlRender } from '@testing-library/react'

import { Form } from '../../../web/lib'

export function render(children: ReactNode, props: Record<string, any> = {}) {
  const mockFunction = jest.fn()
  return rtlRender(
    <Form data-testid="form" onSubmit={mockFunction} {...props}>
      {children}
    </Form>
  )
}
