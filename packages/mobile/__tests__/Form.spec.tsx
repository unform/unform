import React, { RefObject, ReactNode, forwardRef } from 'react';

import { render } from '@testing-library/react-native';
import { FormHandles } from '@unform/core';

import { Form } from '../lib';
import Input from './components/Input';

interface UnformProps {
  onSubmit(): void;
  children?: ReactNode;
  initialData?: object;
}

const UnformRoot: React.RefForwardingComponent<FormHandles, UnformProps> = (
  { children, ...rest },
  ref,
) => {
  const mock = jest.fn();

  return (
    <Form ref={ref} onSubmit={mock} {...rest}>
      {children}
    </Form>
  );
};

const Unform = forwardRef(UnformRoot);

test('it should return data with submits', async () => {
  const formRef: RefObject<FormHandles> = { current: null };
  const submitMock = jest.fn();

  render(
    <Unform ref={formRef} onSubmit={submitMock}>
      <Input testID="name-input" name="name" label="Test" />
    </Unform>,
  );

  formRef.current?.setFieldValue('name', 'John Doe');
  formRef.current?.submitForm();

  expect(submitMock).toBeCalledWith(
    { name: 'John Doe' },
    { reset: expect.any(Function) },
    undefined,
  );
});

test('it should be able to set initial data', async () => {
  const formRef: RefObject<FormHandles> = { current: null };
  const submitMock = jest.fn();

  render(
    <Unform
      initialData={{ name: 'John Doe' }}
      ref={formRef}
      onSubmit={submitMock}
    >
      <Input testID="name-input" name="name" label="Test" />
    </Unform>,
  );

  formRef.current?.submitForm();

  expect(submitMock).toBeCalledWith(
    { name: 'John Doe' },
    { reset: expect.any(Function) },
    undefined,
  );
});
