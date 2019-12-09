import React from 'react';
import { render as rtlRender } from 'react-testing-library';

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
