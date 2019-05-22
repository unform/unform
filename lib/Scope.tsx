import React, { useContext, ReactNode } from 'react';

import FormContext from './Context';

interface Props {
  path: string;
  children: ReactNode;
}

export default function Scope({ path, children }: Props) {
  const { scopePath, ...form } = useContext(FormContext);

  return (
    <FormContext.Provider
      value={{
        ...form,
        scopePath: scopePath.concat(scopePath ? `.${path}` : path),
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
