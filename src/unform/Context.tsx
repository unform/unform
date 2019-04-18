import { createContext } from "react";

import { Context } from "./types";

export default createContext<Context | null>(null);
