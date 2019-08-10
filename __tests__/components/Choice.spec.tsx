import React from 'react';
import { fireEvent, wait, act } from 'react-testing-library';
import * as Yup from 'yup';

import { Choice } from '../../lib';
import render from '../../lib/RenderTest';

const expectCheckbox = (field: HTMLElement, checked: boolean) => {
  expect((field as HTMLInputElement).checked).toBe(checked);
};

describe('Form', () => {
  it('should display labels if specified', () => {
    const { getByText } = render(
      <Choice name="choice" options={[{ value: '1', label: 'choice_1' }]} />
    );

    expect(getByText('choice_1')).toBeDefined();
  });

  it('should not display labels unless specified', () => {
    const { getByText } = render(
      <Choice name="choice" options={[{ value: '1' }]} />
    );

    expect(() => getByText('choice_1')).toThrow(/^Unable to find an element.*/);
  });

  it('should display errors', async () => {
    const schema = Yup.object().shape({
      choice: Yup.array(Yup.string())
        .min(1)
        .required('Choice is required'),
    });

    const { getByText, getByTestId } = render(
      <Choice name="choice" options={[{ value: '1', label: 'choice_1' }]} />,
      { schema }
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });
    await wait(() => expect(!!getByText('Choice is required')).toBe(true));
  });

  it('should return array of values if multiple', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Choice
        name="choice"
        options={[
          { value: '1', label: 'choice_1' },
          { value: '2', label: 'choice_2' },
          { value: '3', label: 'choice_3' },
          { value: '4', label: 'choice_4' },
        ]}
        multiple
      />,
      {
        onSubmit: submitMock,
      }
    );

    fireEvent.click(getByLabelText('choice_1'));
    fireEvent.click(getByLabelText('choice_3'));
    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        choice: ['1', '3'],
      },
      {
        resetForm: expect.any(Function),
      }
    );
  });

  it('should return single value unless multiple', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Choice
        name="choice"
        options={[
          { value: '1', label: 'choice_1' },
          { value: '2', label: 'choice_2' },
          { value: '3', label: 'choice_3' },
          { value: '4', label: 'choice_4' },
        ]}
      />,
      {
        onSubmit: submitMock,
      }
    );

    fireEvent.click(getByLabelText('choice_1'));
    fireEvent.click(getByLabelText('choice_3'));
    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        choice: '3',
      },
      {
        resetForm: expect.any(Function),
      }
    );
  });

  it('should default check field if initialData supplied as array', async () => {
    const { getByLabelText } = render(
      <Choice
        name="tech"
        multiple
        options={[
          { value: 'node', label: 'NodeJS' },
          { value: 'react', label: 'ReactJS' },
          { value: 'rn', label: 'React Native' },
        ]}
      />,
      {
        initialData: { tech: ['node', 'react'] },
      }
    );
    expectCheckbox(getByLabelText('NodeJS'), true);
    expectCheckbox(getByLabelText('ReactJS'), true);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should default check field if initialData supplied as string', async () => {
    const { getByLabelText } = render(
      <Choice
        name="tech"
        multiple
        options={[
          { value: 'node', label: 'NodeJS' },
          { value: 'react', label: 'ReactJS' },
          { value: 'rn', label: 'React Native' },
        ]}
      />,

      {
        initialData: { tech: 'react' },
      }
    );
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), true);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should not default check field unless initialData supplied', async () => {
    const { getByLabelText } = render(
      <Choice
        name="tech"
        multiple
        options={[
          { value: 'node', label: 'NodeJS' },
          { value: 'react', label: 'ReactJS' },
          { value: 'rn', label: 'React Native' },
        ]}
      />
    );
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), false);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should reset state after submit', () => {
    const { getByTestId, getByLabelText } = render(
      <Choice
        name="tech"
        multiple
        options={[
          { value: 'node', label: 'NodeJS' },
          { value: 'react', label: 'ReactJS' },
          { value: 'rn', label: 'React Native' },
        ]}
      />,
      {
        onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm(),
        initialData: { tech: ['node', 'react'] },
      }
    );

    fireEvent.submit(getByTestId('form'));
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), false);
    expectCheckbox(getByLabelText('React Native'), false);
  });
});
