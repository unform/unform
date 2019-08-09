import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { render, fireEvent, wait, act } from 'react-testing-library';
import * as Yup from 'yup';

import { Form, Choice } from '../../lib';

const expectCheckbox = (field: HTMLElement, checked: boolean) => {
  expect((field as HTMLInputElement).checked).toBe(checked);
};

describe('Form', () => {
  it('should display labels if specified', () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Choice name="choice" options={[{ value: '1', label: 'choice_1' }]} />
      </Form>
    );

    expect(getByText('choice_1')).toBeDefined();
  });

  it('should not display labels unless specified', () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Choice name="choice" options={[{ value: '1' }]} />
      </Form>
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
      <Form schema={schema} onSubmit={jest.fn()}>
        <Choice name="choice" options={[{ value: '1', label: 'choice_1' }]} />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });
    await wait(() => expect(!!getByText('Choice is required')).toBe(true));
  });

  it('should return array of values if multiple', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Choice
          name="choice"
          options={[
            { value: '1', label: 'choice_1' },
            { value: '2', label: 'choice_2' },
            { value: '3', label: 'choice_3' },
            { value: '4', label: 'choice_4' },
          ]}
          multiple
        />
      </Form>
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
      <Form onSubmit={submitMock}>
        <Choice
          name="choice"
          options={[
            { value: '1', label: 'choice_1' },
            { value: '2', label: 'choice_2' },
            { value: '3', label: 'choice_3' },
            { value: '4', label: 'choice_4' },
          ]}
        />
      </Form>
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
      <Form onSubmit={() => {}} initialData={{ tech: ['node', 'react'] }}>
        <Choice
          name="tech"
          multiple
          options={[
            { value: 'node', label: 'NodeJS' },
            { value: 'react', label: 'ReactJS' },
            { value: 'rn', label: 'React Native' },
          ]}
        />
      </Form>
    );
    expectCheckbox(getByLabelText('NodeJS'), true);
    expectCheckbox(getByLabelText('ReactJS'), true);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should default check field if initialData supplied as string', async () => {
    const { getByLabelText } = render(
      <Form onSubmit={() => {}} initialData={{ tech: 'react' }}>
        <Choice
          name="tech"
          multiple
          options={[
            { value: 'node', label: 'NodeJS' },
            { value: 'react', label: 'ReactJS' },
            { value: 'rn', label: 'React Native' },
          ]}
        />
      </Form>
    );
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), true);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should not default check field unless initialData supplied', async () => {
    const { getByLabelText } = render(
      <Form onSubmit={() => {}}>
        <Choice
          name="tech"
          multiple
          options={[
            { value: 'node', label: 'NodeJS' },
            { value: 'react', label: 'ReactJS' },
            { value: 'rn', label: 'React Native' },
          ]}
        />
      </Form>
    );
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), false);
    expectCheckbox(getByLabelText('React Native'), false);
  });

  it('should reset state after submit', () => {
    const { getByTestId, getByLabelText } = render(
      <Form
        onSubmit={(_, { resetForm }) => resetForm()}
        initialData={{ tech: ['node', 'react'] }}
      >
        <Choice
          name="tech"
          multiple
          options={[
            { value: 'node', label: 'NodeJS' },
            { value: 'react', label: 'ReactJS' },
            { value: 'rn', label: 'React Native' },
          ]}
        />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));
    expectCheckbox(getByLabelText('NodeJS'), false);
    expectCheckbox(getByLabelText('ReactJS'), false);
    expectCheckbox(getByLabelText('React Native'), false);
  });
});
