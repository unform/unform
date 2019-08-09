import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { render, fireEvent, wait } from 'react-testing-library';
import * as Yup from 'yup';

import { Form, Check } from '../../lib';

describe('Form', () => {
  it('should display label', () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Check name="check" label="Check" />
      </Form>
    );

    expect(!!getByText('Check')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      check: Yup.boolean().oneOf([true], 'Check is required'),
    });

    const { getByText, getByTestId } = render(
      <Form schema={schema} onSubmit={jest.fn()}>
        <Check name="check" label="Check" />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));
    await wait(() => expect(!!getByText('Check is required')).toBe(true));
  });

  it('should return true if default value is true', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={submitMock} initialData={{ check: true }}>
        <Check name="check" label="Check" />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: true,
      },
      {
        resetForm: expect.any(Function),
      }
    );
  });

  it('should return true if selected', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Check name="check" label="Check" />
      </Form>
    );

    fireEvent.click(getByLabelText('Check'));
    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: true,
      },
      {
        resetForm: expect.any(Function),
      }
    );
  });

  it('should return false unless selected', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Check name="check" label="Check" />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: false,
      },
      {
        resetForm: expect.any(Function),
      }
    );
  });

  it('should reset state after submit', () => {
    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={(_, { resetForm }) => resetForm()}>
        <Check name="check" label="Check" />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));

    expect((getByLabelText('check') as HTMLInputElement).checked).toBe(false);
  });
});
