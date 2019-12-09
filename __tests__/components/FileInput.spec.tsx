import React from 'react';
import { act, fireEvent, wait } from 'react-testing-library';
import * as Yup from 'yup';

import { FileInput } from '../../lib';
import render from '../../lib/RenderTest';

describe('Form', () => {
  it('should render file input', () => {
    const { container } = render(<FileInput name="name" label="Name" />);

    expect(!!container.querySelector('input[type=file]')).toBe(true);
  });

  it('should display label', () => {
    const { getByText } = render(
      <FileInput name="attach" label="Attachment" />,
    );

    expect(!!getByText('Attachment')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      attach: Yup.string().required('File is required'),
    });

    const { getByText, getByTestId } = render(
      <FileInput name="attach" label="Attachment" />,
      { schema },
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => expect(!!getByText('File is required')).toBe(true));
  });

  it('should call onStartProgress when exists into properties', async () => {
    const onStartProgressMock = jest.fn();

    const { getByLabelText } = render(
      <FileInput name="attach" onStartProgress={onStartProgressMock} />,
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
        expect.any(ProgressEvent),
      );
    });
  });

  it('should reset file input when resetFrom dispatched', async () => {
    const { getByTestId, getByLabelText } = render(
      <FileInput name="attach" />,
      { onSubmit: (_: any, { resetForm }: { resetForm: any }) => resetForm() },
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
