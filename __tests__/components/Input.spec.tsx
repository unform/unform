import React from 'react';
import { act, fireEvent, wait } from 'react-testing-library';
import * as Yup from 'yup';

import { Input } from '../../lib';
import render from '../../lib/RenderTest';

describe('Form', () => {
  it('should display label', () => {
    const { getByText } = render(<Input name="name" label="Name" />);

    expect(!!getByText('Name')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
    });

    const { getByText, getByTestId } = render(
      <Input name="name" label="Nome" />,
      { schema },
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => expect(!!getByText('Name is required')).toBe(true));
  });

  it('should act as textarea when multiline prop is supplied', () => {
    const { container } = render(
      <>
        <Input name="name" label="Name" />
        <Input name="profile" label="Profile" multiline />
      </>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
    expect(!!container.querySelector('textarea[name=profile]')).toBe(true);
  });
});
