import React from 'react';
import {
 act, fireEvent, wait,
} from 'react-testing-library';
import * as Yup from 'yup';

import { Textarea } from '../../lib';
import render from '../../lib/RenderTest';

describe('Form', () => {
  it('should display label', () => {
    const { getByText } = render(
      <Textarea name="name" label="Name" />,
    );

    expect(!!getByText('Name')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
    });

    const { getByText, getByTestId } = render(
      <Textarea name="name" label="Nome" />,
      { schema },
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => expect(!!getByText('Name is required')).toBe(true));
  });
});
