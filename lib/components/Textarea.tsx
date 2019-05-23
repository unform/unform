import React, { useEffect } from 'react';

import Input from './Input';

interface Props {
  name: string;
  label?: string;
  multiline?: true;
}

type TextAreaProps = JSX.IntrinsicElements['textarea'] & Props;

export default function Textarea(props: TextAreaProps) {
  useEffect(() => {
    console.warn(
      'Textarea will be deprecated in the next major unform release. Please use <Input multiline /> instead',
    );
  }, []);

  return <Input {...props} multiline />;
}
