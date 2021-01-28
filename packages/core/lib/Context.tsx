/* istanbul ignore file */

import { createContext } from 'react'

import { UnformContext } from './types'

export const FormContext = createContext<UnformContext>({} as UnformContext)
