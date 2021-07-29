import {
  forwardRef,
  FormEvent,
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useEffect,
} from 'react'

import dot from 'dot-object'

import { FormContext } from './Context'
import {
  UnformOriginalData,
  UnformErrors,
  UnformField,
  FormHandles,
  FormProps,
} from './types'

const Form: ForwardRefRenderFunction<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit },
  formRef
) => {
  const [errors, setErrors] = useState<UnformErrors>({})
  const originalData = useRef<UnformOriginalData>({})
  const fields = useRef<UnformField[]>([])

  useEffect(() => {
    originalData.current = {}
    originalData.current = dot.dot(initialData)
  }, [initialData])

  const getFieldByName = useCallback(
    fieldName =>
      fields.current.find(unformField => unformField.name === fieldName),
    []
  )

  const getFieldValue = useCallback(({ ref, getValue, path }: UnformField) => {
    if (getValue) {
      return getValue(ref)
    }

    return path && dot.pick(path, ref)
  }, [])

  const setFieldValue = useCallback(
    ({ path, ref, setValue, name }: UnformField, value: any) => {
      originalData.current[name] = value

      if (setValue) {
        return setValue(ref, value)
      }

      return path ? dot.set(path, value, ref as object) : false
    },
    []
  )

  const clearFieldValue = useCallback(
    ({ clearValue, ref, path, name }: UnformField) => {
      originalData.current[name] = ''

      if (clearValue) {
        return clearValue(ref, '')
      }

      return path && dot.set(path, '', ref as object)
    },
    []
  )

  const reset = useCallback((data = {}) => {
    fields.current.forEach(({ name, ref, path, clearValue }) => {
      const dataAsDot = dot.dot(data)

      originalData.current[name] = dataAsDot[name] ? dataAsDot[name] : ''

      if (clearValue) {
        return clearValue(ref, data[name])
      }

      return (
        path &&
        dot.set(path, dataAsDot[name] ? dataAsDot[name] : '', ref as object)
      )
    })
  }, [])

  const setData = useCallback(
    (data: object) => {
      const fieldValue = {}

      fields.current.forEach(field => {
        fieldValue[field.name] = dot.pick(field.name, data)
      })

      originalData.current = {}
      originalData.current = fieldValue

      Object.entries(fieldValue).forEach(([fieldName, value]) => {
        const field = getFieldByName(fieldName)

        if (field) {
          setFieldValue(field, value)
        }
      })
    },
    [getFieldByName, setFieldValue]
  )

  const setFormErrors = useCallback((formErrors: object) => {
    const parsedErrors = dot.dot(formErrors)

    setErrors(parsedErrors)
  }, [])

  const parseFormData = useCallback(() => {
    const data = {}

    fields.current.forEach(field => {
      data[field.name] = getFieldValue(field)
    })

    dot.object(data)

    return data
  }, [getFieldValue])

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      if (event) {
        event.preventDefault()
      }

      const data = parseFormData()

      onSubmit(data, { reset }, event)
    },
    [onSubmit, parseFormData, reset]
  )

  const registerField = useCallback((field: UnformField) => {
    fields.current.push(field)
  }, [])

  const unregisterField = useCallback((fieldName: string) => {
    const fieldIndex = fields.current.findIndex(
      field => field.name === fieldName
    )

    if (fieldIndex > -1) {
      fields.current.splice(fieldIndex, 1)
    }
  }, [])

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(state => ({ ...state, [fieldName]: undefined }))
  }, [])

  const getIsFormDirty = useCallback(() => {
    const currentDataAsKeyPair = dot.dot(parseFormData())

    for (const key in currentDataAsKeyPair) {
      if (Object.prototype.hasOwnProperty.call(currentDataAsKeyPair, key)) {
        const originalValue = originalData.current[key]
        const currentValue = currentDataAsKeyPair[key]

        switch (typeof originalValue) {
          case 'number':
            if (originalValue !== Number(currentValue)) {
              return true
            }
            break

          default:
            if (currentDataAsKeyPair[key] !== originalData.current[key]) {
              return true
            }
            break
        }
      }
    }

    return false
  }, [parseFormData])

  useImperativeHandle<{}, FormHandles>(formRef, () => ({
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName)

      if (!field) {
        return false
      }

      return getFieldValue(field)
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName)

      if (!field) {
        return false
      }

      return setFieldValue(field, value)
    },
    getFieldError(fieldName) {
      return errors[fieldName]
    },
    setFieldError(fieldName, error) {
      setErrors(state => ({ ...state, [fieldName]: error }))
    },
    clearField(fieldName) {
      const field = getFieldByName(fieldName)

      if (field) {
        clearFieldValue(field)
      }
    },
    getErrors() {
      return errors
    },
    setErrors(formErrors) {
      return setFormErrors(formErrors)
    },
    getData() {
      return parseFormData()
    },
    getFieldRef(fieldName) {
      const field = getFieldByName(fieldName)

      if (!field) {
        return false
      }

      return field.ref
    },
    setData(data) {
      return setData(data)
    },
    reset(data) {
      return reset(data)
    },
    submitForm() {
      handleSubmit()
    },
    isFormDirty() {
      return getIsFormDirty()
    },
  }))

  return (
    <FormContext.Provider
      value={{
        initialData,
        errors,
        scopePath: '',
        registerField,
        unregisterField,
        clearFieldError,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const FormProvider = forwardRef(Form)
