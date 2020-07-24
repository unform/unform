import React, { RefObject } from 'react';

import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect.js';

// import { Form } from '../../web/lib';
import { FormHandles } from '../lib';
import CheckboxInput from './components/CheckboxInput';
import render from './utils/RenderTest';

describe('CheckboxField', () => {
  it('should render radio elements', () => {
    const { container } = render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option3" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option4" />

        <CheckboxInput name="other-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="other-checkbox" type="checkbox" value="option2" />
      </>,
    );

    expect(
      container.querySelectorAll('input[name=some-checkbox]'),
    ).toHaveLength(4);
    expect(
      container.querySelectorAll('input[name=other-checkbox]'),
    ).toHaveLength(2);
  });
  it('should load initial defaultCheck inside checkbox elements', () => {
    const { getByTestId } = render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option3" />
      </>,
      {
        initialData: { 'some-checkbox': 'option2' },
      },
    );

    const option1 = getByTestId('option1') as HTMLInputElement;
    const option2 = getByTestId('option2') as HTMLInputElement;
    const option3 = getByTestId('option3') as HTMLInputElement;

    expect(option1.checked).toEqual(false);
    expect(option2.checked).toEqual(true);
    expect(option3.checked).toEqual(false);
  });
  it('should return value from checked checkbox elements on submit', () => {
    const submitMock = jest.fn();
    const { getByTestId } = render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option3" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option4" />
      </>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.change(getByTestId('option1'), {
      target: { checked: 'true' },
    });
    fireEvent.change(getByTestId('option3'), {
      target: { checked: 'true' },
    });

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        'some-checkbox': ['option1', 'option3'],
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object),
    );
  });
  it('should reset checked checkbox element when reset helper is dispatched', () => {
    const { getByTestId } = render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option3" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option4" />
      </>,
      { onSubmit: (_: any, { reset }: { reset: Function }) => reset() },
    );

    (getByTestId('option1') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option2') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option3') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option4') as HTMLInputElement).checked).toBe(false);
  });
  it('should check checkbox element when reset is dispatched with default checked', () => {
    const newData = {
      'some-checkbox': ['option1', 'option4'],
    };

    const { getByTestId } = render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option3" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option4" />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(newData),
      },
    );

    (getByTestId('option2') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(true);
    expect((getByTestId('option2') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option3') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option4') as HTMLInputElement).checked).toBe(true);
  });
  it('should be able to have custom clear value function', () => {
    const { getByTestId } = render(
      <>
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option1"
          customClearValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option2"
          customClearValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="customClear"
          customClearValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option4"
          customClearValue
        />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
      },
    );

    (getByTestId('option2') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option2') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('customClear') as HTMLInputElement).checked).toBe(true);
    expect((getByTestId('option4') as HTMLInputElement).checked).toBe(false);
  });
  it('should be able to have custom get value function', () => {
    const submitMock = jest.fn();
    const { getByTestId } = render(
      <>
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option1"
          customGetValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option2"
          customGetValue
        />
      </>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        'some-checkbox': 'customGetValue',
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object),
    );
  });
  it('should be able to have custom set value function', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    render(
      <>
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option1"
          customSetValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="customSet"
          customSetValue
        />
        <CheckboxInput
          name="some-checkbox"
          type="checkbox"
          value="option2"
          customSetValue
        />
      </>,
      {
        initialData: { 'some-checkbox': 'option1' },
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
        ref: formRef,
      },
    );

    formRef.current?.setData({ 'some-checkbox': 'option1' });
    expect(formRef.current?.getFieldValue('some-checkbox')).toStrictEqual([
      'customSet',
    ]);
  });
  it('should be able to manually get field ref', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    render(
      <>
        <CheckboxInput name="some-checkbox" type="checkbox" value="option1" />
        <CheckboxInput name="some-checkbox" type="checkbox" value="option2" />
      </>,
      {
        ref: formRef,
      },
    );

    const ref = formRef.current?.getFieldRef('some-checkbox');
    const refNonExistent = formRef.current?.getFieldRef('notexists');

    expect((ref as HTMLInputElement)[0].name).toBe('some-checkbox');
    expect(refNonExistent).toBe(false);
  });
});
