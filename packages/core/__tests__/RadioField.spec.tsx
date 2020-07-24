import React, { RefObject } from 'react';

import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect.js';

// import { Form } from '../../web/lib';
import { FormHandles } from '../lib';
import RadioInput from './components/RadioInput';
import render from './utils/RenderTest';

describe('RadioField', () => {
  it('should render radio elements', () => {
    const { container } = render(
      <>
        <RadioInput name="some-radios" type="radio" value="option1" />
        <RadioInput name="some-radios" type="radio" value="option2" />
        <RadioInput name="some-radios" type="radio" value="option3" />
        <RadioInput name="some-radios" type="radio" value="option4" />

        <RadioInput name="another-radios" type="radio" value="option1" />
        <RadioInput name="another-radios" type="radio" value="option2" />
      </>,
    );

    expect(container.querySelectorAll('input[name=some-radios]')).toHaveLength(
      4,
    );
    expect(
      container.querySelectorAll('input[name=another-radios]'),
    ).toHaveLength(2);
  });
  it('should load initial defaultCheck inside radio elements', () => {
    const { getByTestId } = render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
        <RadioInput name="some-radio" type="radio" value="option2" />
        <RadioInput name="some-radio" type="radio" value="option3" />
      </>,
      {
        initialData: { 'some-radio': 'option2' },
      },
    );

    const option1 = getByTestId('option1') as HTMLInputElement;
    const option2 = getByTestId('option2') as HTMLInputElement;
    const option3 = getByTestId('option3') as HTMLInputElement;

    expect(option1.checked).toEqual(false);
    expect(option2.checked).toEqual(true);
    expect(option3.checked).toEqual(false);
  });
  it('should return value from checked radio element on submit', () => {
    const submitMock = jest.fn();
    const { getByTestId } = render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
        <RadioInput name="some-radio" type="radio" value="option2" />
      </>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.change(getByTestId('option1'), {
      target: { checked: 'true' },
    });

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      {
        'some-radio': 'option1',
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object),
    );
  });
  it('should reset checked radio element when reset helper is dispatched', () => {
    const { getByTestId } = render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
      </>,
      { onSubmit: (_: any, { reset }: { reset: Function }) => reset() },
    );

    (getByTestId('option1') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(false);
  });
  it('should check radio element when reset is dispatched with default checked', () => {
    const newData = {
      'some-radio': 'option1',
    };

    const { getByTestId } = render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
        <RadioInput name="some-radio" type="radio" value="option2" />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(newData),
      },
    );

    (getByTestId('option2') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(true);
    expect((getByTestId('option2') as HTMLInputElement).checked).toBe(false);
  });
  it('should be able to have custom clear value function', () => {
    const { getByTestId } = render(
      <>
        <RadioInput
          name="some-radio"
          type="radio"
          value="option1"
          customClearValue
        />
        <RadioInput
          name="some-radio"
          type="radio"
          value="option2"
          customClearValue
        />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
      },
    );

    (getByTestId('option2') as HTMLInputElement).checked = true;

    fireEvent.submit(getByTestId('form'));

    expect((getByTestId('option2') as HTMLInputElement).checked).toBe(false);
    expect((getByTestId('option1') as HTMLInputElement).checked).toBe(false);
  });
  it('should be able to have custom get value function', () => {
    const submitMock = jest.fn();
    const { getByTestId } = render(
      <>
        <RadioInput
          name="some-radio"
          type="radio"
          value="option1"
          customGetValue
        />
        <RadioInput
          name="some-radio"
          type="radio"
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
        'some-radio': 'customGetValue',
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
        <RadioInput
          name="some-radio"
          type="radio"
          value="option1"
          customSetValue
        />
        <RadioInput
          name="some-radio"
          type="radio"
          value="customSetValue"
          customSetValue
        />
        <RadioInput
          name="some-radio"
          type="radio"
          value="option2"
          customSetValue
        />
      </>,
      {
        initialData: { 'some-radio': 'option1' },
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
        ref: formRef,
      },
    );

    formRef.current?.setData({ 'some-radio': 'option1' });
    expect(formRef.current?.getFieldValue('some-radio')).toBe('customSetValue');
  });
  it('should be able to manually get field ref', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
        <RadioInput name="some-radio" type="radio" value="option2" />
      </>,
      {
        ref: formRef,
      },
    );

    const ref = formRef.current?.getFieldRef('some-radio');
    const refNonExistent = formRef.current?.getFieldRef('notexists');

    expect((ref as HTMLInputElement)[0].name).toBe('some-radio');
    expect(refNonExistent).toBe(false);
  });
  it('should return null when none radio element is checked', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    render(
      <>
        <RadioInput name="some-radio" type="radio" value="option1" />
        <RadioInput name="some-radio" type="radio" value="option2" />
      </>,
      {
        ref: formRef,
      },
    );

    const value = formRef.current?.getFieldValue('some-radio');
    expect(value).toBe(null);
  });
});
