import { useContext } from 'react';

import Context from '../Context';

export default function useSubmit() {
  const { handleSubmit } = useContext(Context);

  return handleSubmit;
}
