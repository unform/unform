import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import {
 act, render, fireEvent, wait,
} from 'react-testing-library';
import * as Yup from 'yup';

import { Form, Input } from '../../lib';

describe('Form', () => {
  it('should display label', () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Input name="name" label="Name" />
      </Form>,
    );

    expect(!!getByText('Name')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
    });

    const { getByText, getByTestId } = render(
      <Form schema={schema} onSubmit={jest.fn()}>
        <Input name="name" label="Nome" />
      </Form>,
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => expect(!!getByText('Name is required')).toBe(true));
  });

  it('should act as textarea when multiline prop is supplied', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <Input name="name" label="Name" />
        <Input name="profile" label="Profile" multiline />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
    expect(!!container.querySelector('textarea[name=profile]')).toBe(true);
  });
});
