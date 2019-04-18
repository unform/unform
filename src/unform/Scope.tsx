import React, { useContext, ReactNode } from "react";

import FormContext from "./Context";

interface Props {
  path: string;
  hidden?: boolean;
  children: ReactNode;
}

export default function Scope({ path, hidden = false, children }: Props) {
  const form = useContext(FormContext);

  return (
    <FormContext.Provider
      value={{ ...form, scopePath: form.scopePath.concat(path) }}
    >
      {children}
    </FormContext.Provider>
  );
}
