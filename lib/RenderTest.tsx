import { render as rtlRender } from '@testing-library/react';
import React from 'react';

import { Form } from '.';

export default function RenderTest(
  children: React.ReactNode,
  props: object = {},
) {
  const mockFunction = jest.fn();
  return rtlRender(
    <Form onSubmit={mockFunction} {...props}>
      {children}
    </Form>,
  );
}
