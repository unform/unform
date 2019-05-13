/* istanbul ignore file */

import { createContext } from "react";

import { Context } from "./types";

export default createContext<Context>({
  initialData: {},
  errors: {},
  scopePath: "",
  registerField: () => {},
  unregisterField: () => {}
});
