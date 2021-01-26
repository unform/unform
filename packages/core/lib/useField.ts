import { useContext, useEffect, useMemo, useCallback } from 'react'

import dot from 'dot-object'

import { FormContext } from './Context'

export function useField(name: string) {
  const {
    initialData,
    errors,
    scopePath,
    unregisterField,
    registerField,
    clearFieldError,
  } = useContext(FormContext)

  const fieldName = useMemo(() => {
    return scopePath ? `${scopePath}.${name}` : name
  }, [name, scopePath])

  const defaultValue = useMemo(() => {
    return dot.pick(fieldName, initialData)
  }, [fieldName, initialData])

  const error = useMemo(() => {
    return errors[fieldName]
  }, [errors, fieldName])

  const clearError = useCallback(() => {
    clearFieldError(fieldName)
  }, [clearFieldError, fieldName])

  useEffect(() => () => unregisterField(fieldName), [
    fieldName,
    unregisterField,
  ])

  return {
    fieldName,
    registerField,
    defaultValue,
    clearError,
    error,
  }
}
