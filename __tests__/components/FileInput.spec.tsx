import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import {
  act, render, fireEvent, wait,
} from 'react-testing-library';
import * as Yup from 'yup';

import { Form, FileInput } from '../../lib';

describe('Form', () => {
  it('should render file input', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <FileInput name="name" label="Name" />
      </Form>,
    );

    expect(!!container.querySelector('input[type=file]')).toBe(true);
  });

  it('should display label', () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <FileInput name="attach" label="Attachment" />
      </Form>,
    );

    expect(!!getByText('Attachment')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      attach: Yup.string().required('File is required'),
    });

    const { getByText, getByTestId } = render(
      <Form schema={schema} onSubmit={jest.fn()}>
        <FileInput name="attach" label="Attachment" />
      </Form>,
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => expect(!!getByText('File is required')).toBe(true));
  });

  it('should call onStartProgress when exists into properties', async () => {
    const onStartProgressMock = jest.fn();

    const { getByLabelText } = render(
      <Form onSubmit={jest.fn()}>
        <FileInput name="attach" onStartProgress={onStartProgressMock} />
      </Form>,
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });

    act(() => {
      fireEvent.change(getByLabelText('attach'), {
        target: { files: [file] },
      });
    });

    await wait(() => {
      expect(onStartProgressMock).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(ProgressEvent)
      );
    });
  });

  it('should reset file input when resetFrom dispatched', async () => {
    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={(_, { resetForm }) => resetForm()}>
        <FileInput name="attach" />
      </Form>,
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });

    act(() => {
      fireEvent.change(getByLabelText('attach'), {
        target: { files: [file] },
      });

      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => {
      expect((getByLabelText('attach') as HTMLInputElement).value).toBe('');
    });
  });
});
