/* istanbul ignore file */

import { createContext } from 'react';

import { UnformContext } from './types';

export default createContext<UnformContext>({
  initialData: {},
  errors: {},
  scopePath: '',
  registerField: () => {},
  unregisterField: () => {},
});
