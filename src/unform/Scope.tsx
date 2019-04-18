import React, { useContext, ReactNode } from "react";

import FormContext from "./Context";

interface Props {
  path: string;
  children: ReactNode;
}

export default function Scope({ path, children }: Props) {
  const form = useContext(FormContext);

  return (
    <FormContext.Provider
      value={{ ...form, scopePath: form.scopePath.concat(path) }}
    >
      {children}
    </FormContext.Provider>
  );
}
