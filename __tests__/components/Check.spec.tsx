import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import * as Yup from 'yup';

import { Check } from '../../lib';
import render from '../../lib/RenderTest';

describe('Form', () => {
  it('should display label', () => {
    const { getByText } = render(<Check name="check" label="Check" />);

    expect(!!getByText('Check')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      check: Yup.boolean().oneOf([true], 'Check is required'),
    });

    const { getByText, getByTestId } = render(
      <Check name="check" label="Check" />,
      { schema },
    );

    fireEvent.submit(getByTestId('form'));
    await wait(() => expect(!!getByText('Check is required')).toBe(true));
  });

  it('should return true if default value is true', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(<Check name="check" label="Check" />, {
      initialData: { check: true },
      onSubmit: submitMock,
    });

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: true,
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should return true if selected', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Check name="check" label="Check" />,
      { onSubmit: submitMock },
    );

    fireEvent.click(getByLabelText('Check'));
    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: true,
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should return false unless selected', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(<Check name="check" label="Check" />, {
      onSubmit: submitMock,
    });

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        check: false,
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should reset state after submit', () => {
    const { getByTestId, getByLabelText } = render(
      <Check name="check" label="Check" />,
      {
        onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm(),
      },
    );

    fireEvent.submit(getByTestId('form'));

    expect((getByLabelText('check') as HTMLInputElement).checked).toBe(false);
  });
});