import React from 'react';
import {
  act,
  fireEvent,
  wait,
  getByTestId,
  getByText,
} from 'react-testing-library';
import * as Yup from 'yup';

import { Form, Input, Select, Scope, useFormContext } from '../lib';
import render from '../lib/RenderTest';
import CustomInputClear from './utils/CustomInputClear';
import CustomInputParse from './utils/CustomInputParse';

describe('Form', () => {
  it('should render form elements', () => {
    const { container } = render(
      <>
        <Input name="name" />
        <Input multiline name="bio" />
        <Select name="tech" options={[{ id: 'node', title: 'Node' }]} />
      </>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
    expect(!!container.querySelector('textarea[name=bio]')).toBe(true);
    expect(!!container.querySelector('select[name=tech]')).toBe(true);
  });

  it('should load initial data inside form elements', () => {
    const { container } = render(<Input name="name" />, {
      initialData: { name: 'Diego' },
    });

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'Diego',
    );
  });

  it('should return form elements data on submit', () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
        <Scope path="address">
          <Input name="street" />
        </Scope>
      </>,
      {
        onSubmit: submitMock,
        initialData: { address: { street: 'John Doe Avenue' } },
      },
    );

    fireEvent.change(getByLabelText('name'), {
      target: { value: 'Diego' },
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: 'Diego',
        address: {
          street: 'John Doe Avenue',
        },
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should toggle is submitting while execution is happening', async () => {
    jest.useFakeTimers();

    const submitMock = () => new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

    const Content = () => {
      const { isSubmitting } = useFormContext();

      return (
        <>
          <Input name="name" />
          <button type="submit" data-testid="button" disabled={isSubmitting}>
            Submit
          </button>
        </>
      );
    };

    const { getByTestId } = render(<Content />, {
      onSubmit: submitMock,
      initialData: { name: 'Zaguini' },
    });

    const form = getByTestId('form');
    const submitButton = getByTestId('button');

    fireEvent.submit(form);
    wait(() => expect(submitButton).toHaveAttribute('disabled'));

    jest.runAllTimers();
    wait(() => expect(submitButton).not.toHaveAttribute('disabled'));

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should set a status on the form', () => {
    const statusContent = 'it works!';
    const submitMock = () => statusContent;

    const Content = () => {
      const { status } = useFormContext();

      return (
        <>
          {status && <span data-testid="status">{status}</span>}
          <Input name="name" />
        </>
      );
    };

    const { getByTestId, baseElement } = render(<Content />, {
      onSubmit: submitMock,
      initialData: { name: 'Zaguini' },
    });

    const form = getByTestId('form');

    fireEvent.submit(form);
    wait(() => expect(getByText(baseElement, statusContent)).toBe(true));
  });

  it('should remove unmounted elements from refs', () => {
    const submitMock = jest.fn();

    const { getByTestId, rerender } = render(<Input name="name" />, {
      onSubmit: submitMock,
      initialData: { name: 'Diego' },
    });

    rerender(
      <Form onSubmit={submitMock} initialData={{ another: 'Diego' }}>
        <Input name="another" />
      </Form>,
    );

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      {
        another: 'Diego',
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should update data to match schema', async () => {
    const submitMock = jest.fn();
    const schema = Yup.object().shape({
      name: Yup.string(),
      bio: Yup.string().when('$stripBio', {
        is: true,
        then: Yup.string().strip(true),
      }),
    });

    const { getByTestId } = render(
      <>
        <Input name="name" />
        <Input name="bio" />
      </>,
      {
        schema,
        context: { stripBio: true },
        onSubmit: submitMock,
        initialData: { name: 'Diego', bio: 'Testing' },
      },
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => {
      expect(submitMock).toHaveBeenCalledWith(
        { name: 'Diego' },
        {
          resetForm: expect.any(Function),
        },
      );
    });
  });

  it('should reset form data when resetForm helper is dispatched', () => {
    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
        <Select
          name="tech"
          placeholder="Select..."
          options={[{ id: 'node', title: 'NodeJS' }]}
        />
      </>,
      { onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm() },
    );

    getByLabelText('name').setAttribute('value', 'Diego');

    fireEvent.change(getByLabelText('tech'), { target: { value: 'node' } });

    fireEvent.submit(getByTestId('form'));

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('');
    expect((getByLabelText('tech') as HTMLSelectElement).value).toBe('');
  });

  it('should apply data when resetForm is dispatched with new values', () => {
    const newData = {
      name: 'John Doe',
      tech: 'react',
    };

    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
        <Select
          name="tech"
          placeholder="Select..."
          options={[
            { id: 'node', title: 'NodeJS' },
            { id: 'react', title: 'ReactJS' },
          ]}
        />
      </>,
      {
        onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm(newData),
      },
    );

    getByLabelText('name').setAttribute('value', 'Diego');

    fireEvent.change(getByLabelText('tech'), { target: { value: 'node' } });

    fireEvent.submit(getByTestId('form'));

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('John Doe');
    expect((getByLabelText('tech') as HTMLSelectElement).value).toBe('react');
  });

  it('should be able to have custom value parser', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <>
        <CustomInputParse name="name" />
      </>,
      { onSubmit: submitMock, initialData: { name: 'Diego' } },
    );

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: 'Diego-test',
      },
      {
        resetForm: expect.any(Function),
      },
    );
  });

  it('should be able to have custom value clearer', () => {
    const { getByTestId, getByLabelText } = render(
      <>
        <CustomInputClear name="name" />
      </>,
      {
        onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm(),
        initialData: { name: 'Diego' },
      },
    );

    fireEvent.submit(getByTestId('form'));

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('test');
  });

  it('should render form with class attribute', () => {
    const { container } = render(
      <>
        <Input name="name" />
      </>,
      { className: 'test-class' },
    );

    expect(getByTestId(container, 'form')).toHaveAttribute(
      'class',
      'test-class',
    );
  });
});
