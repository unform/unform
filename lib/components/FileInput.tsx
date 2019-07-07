import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import useField from '../useField';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  selectedText?: string;
  customController?: boolean;
  onStartProgress?: (progress: number, event: ProgressEvent) => void;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const defaultProps: Partial<Props> = {
  customController: false,
  placeholder: 'Browse...',
  selectedText: 'files selected',
};

function FileInput({
  name,
  label,
  className,
  selectedText,
  onStartProgress,
  customController,
  placeholder: defaultPlaceholder,
  style,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [file, setFile] = useState(defaultValue);
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);

  useEffect(() => {
    /* istanbul ignore next  */
    if (!ref.current) return;
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'dataset.file',
      clearValue: (fileRef: HTMLInputElement) => {
        fileRef.value = '';
        setFile('');
        setPlaceholder(defaultPlaceholder);
      },
    });
  }, [ref.current, fieldName]);

  const props: InputProps = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    style: {
      display: customController ? 'none' : 'inline-block',
      ...style,
    },
  };

  function handleChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader();
    const { files } = changeEvent.target;
    /* istanbul ignore next  */
    if (!files || !files.length) return;

    fileReader.onload = () => {
      /* istanbul ignore next  */
      if (!fileReader.result) return;
      setFile(fileReader.result);
    };

    fileReader.onprogress = (progressEent: ProgressEvent) => {
      /* istanbul ignore next  */
      if (!onStartProgress) return;
      /* istanbul ignore next  */
      const { loaded = 0, total = 0 } = progressEent;
      const progress = (loaded / total) * 100;

      onStartProgress(progress, progressEent);
    };

    fileReader.readAsDataURL(files[0]);

    /* istanbul ignore next  */
    if (!customController) return;

    const fileName =
      files.length === 1
        ? files[0].name.split('\\').pop()
        : `${files.length} ${selectedText}`;

    setPlaceholder(fileName);
  }

  function handleClick() {
    /* istanbul ignore next  */
    if (!ref.current) return;
    ref.current.click();
  }

  return (
    <div className={className} role="presentation">
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input {...props} type="file" onChange={handleChange} data-file={file} />

      {customController && (
        <button
          type="button"
          onClick={handleClick}
          aria-label={defaultPlaceholder}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
            <path d="M15 7l-5-6-5 6h4v8h2V7h4z" />
          </svg>
          {placeholder}
        </button>
      )}

      {error && <span>{error}</span>}
    </div>
  );
}

FileInput.defaultProps = defaultProps;

export default FileInput;
