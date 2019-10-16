import pick from 'lodash.pick';
import { useContext } from 'react';

import FormContext from './Context';

export default function useFormContext() {
  const desiredProps = ['status', 'setStatus', 'isSubmitting'];

  return pick(useContext(FormContext), desiredProps);
}
