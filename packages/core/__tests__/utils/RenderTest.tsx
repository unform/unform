import React from 'react';

import { render as rtlRender } from '@testing-library/react';

import { Form } from '../../../web/lib';

export default function RenderTest(
  children: React.ReactNode,
  props: object = {},
) {
  const mockFunction = jest.fn();
  return rtlRender(
    <Form data-testid="form" onSubmit={mockFunction} {...props}>
      {children}
    </Form>,
  );
}
