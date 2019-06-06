import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import useField from '../useField';

interface Props {
  name: string;
  label?: string;
  onStartProgress?: (progress: number, event: ProgressEvent) => void;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export default function Input({
  name,
  label,
  onStartProgress,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [file, setFile] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
        clearValue: (fileRef: HTMLInputElement) => {
          fileRef.value = '';
          setFile('');
        },
      });
    }
  }, [ref.current, fieldName]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader();

    fileReader.onload = (evt: ProgressEvent) => {
      const { result } = evt.target as any;
      setFile(result);
    };

    fileReader.onprogress = (evt: ProgressEvent) => {
      /* istanbul ignore next  */
      const { loaded = 0, total = 0 } = evt;
      const progress = (loaded / total) * 100;

      if (onStartProgress) {
        onStartProgress(progress, evt);
      }
    };

    const { files } = event.target;
    if (files) {
      fileReader.readAsDataURL(files[0]);
    }
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input {...props} type="file" onChange={handleChange} data-file={file} />

      {error && <span>{error}</span>}
    </>
  );
}
