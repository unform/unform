import {
  forwardRef,
  FormEvent,
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react'

import dot from 'dot-object'

import { FormContext } from './Context'
import { UnformErrors, UnformField, FormHandles, FormProps } from './types'

type Fields = Array<UnformField | UnformField[]>

const Form: ForwardRefRenderFunction<FormHandles, FormProps> = (
  { initialData = {}, children, onSubmit },
  formRef
) => {
  const [errors, setErrors] = useState<UnformErrors>({})
  const fields = useRef<Fields>([])

  const getFieldByName = useCallback((fieldName: string) => {
    return fields.current.find(unformField => {
      if (Array.isArray(unformField)) {
        return unformField[0].name === fieldName
      } else {
        return unformField.name === fieldName
      }
    })
  }, [])

  const getFieldValue = useCallback(({ ref, getValue, path }: UnformField) => {
    if (getValue) {
      return getValue(ref)
    }

    return path && dot.pick(path, ref)
  }, [])

  const getFieldsValue = useCallback(
    (field: UnformField[]) => {
      const values: Array<string> = []

      field.forEach(currentField => {
        const value = getFieldValue(currentField)
        value !== null && values.push(value)
      })

      // If there's only one selected value (ex: radio) it returns it, otherwise,
      // for a checkbox it will return the selected values on an array
      const selectedValues = [...values].filter(Boolean)
      return selectedValues.length <= 1 ? selectedValues[0] : selectedValues
    },
    [getFieldValue]
  )

  const setFieldValue = useCallback(
    ({ path, ref, setValue }: UnformField, value: any) => {
      if (setValue) {
        return setValue(ref, value)
      }

      return path ? dot.set(path, value, ref as object) : false
    },
    []
  )

  const setFieldsValue = useCallback(
    (fields: UnformField[], value: any) => {
      fields.forEach(currentField => {
        setFieldValue(currentField, value)
      })
    },
    [setFieldValue]
  )

  const clearFieldValue = useCallback(
    ({ clearValue, ref, path }: UnformField) => {
      if (clearValue) {
        return clearValue(ref, '')
      }

      return path && dot.set(path, '', ref as object)
    },
    []
  )

  const clearFieldsValue = useCallback(
    (fields: UnformField[]) => {
      fields.forEach(currentField => {
        clearFieldValue(currentField)
      })
    },
    [clearFieldValue]
  )

  const resetFieldValue = useCallback(
    ({ name, clearValue, ref, path, data }: UnformField & { data: any }) => {
      if (clearValue) {
        return clearValue(ref, data[name])
      }

      return path && dot.set(path, data[name] ? data[name] : '', ref as object)
    },
    []
  )

  const reset = useCallback(
    (data = {}) => {
      fields.current.forEach(field => {
        if (Array.isArray(field)) {
          field.forEach(currentField =>
            resetFieldValue({ ...currentField, data })
          )
        } else {
          resetFieldValue({ ...field, data })
        }
      })
    },
    [resetFieldValue]
  )

  const setData = useCallback(
    (data: object) => {
      const fieldValue = {}

      fields.current.forEach(field => {
        const fieldName = Array.isArray(field) ? field[0].name : field.name
        fieldValue[fieldName] = dot.pick(fieldName, data)
      })

      Object.entries(fieldValue).forEach(([fieldName, value]) => {
        const field = getFieldByName(fieldName)

        if (field && Array.isArray(field)) {
          setFieldsValue(field, value)
        } else if (field) {
          setFieldValue(field, value)
        }
      })
    },
    [getFieldByName, setFieldValue, setFieldsValue]
  )

  const setFormErrors = useCallback((formErrors: object) => {
    const parsedErrors = dot.dot(formErrors)

    setErrors(parsedErrors)
  }, [])

  const parseFormData = useCallback(() => {
    const data = {}

    fields.current.forEach(field => {
      if (Array.isArray(field)) {
        data[field[0].name] = getFieldsValue(field)
      } else {
        data[field.name] = getFieldValue(field)
      }
    })

    dot.object(data)

    return data
  }, [getFieldValue, getFieldsValue])

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
    const fieldWithSameNameIndex = fields.current.findIndex(currentField => {
      if (Array.isArray(currentField)) {
        return currentField[0].name === field.name
      } else {
        return currentField.name === field.name
      }
    })

    if (fieldWithSameNameIndex >= 0) {
      const currentFieldWithSameName = fields.current[fieldWithSameNameIndex]

      /** Copy all elements with that name and register the new one */
      if (Array.isArray(currentFieldWithSameName)) {
        const arrayOfFields = [...currentFieldWithSameName]
        arrayOfFields.push(field)

        fields.current[fieldWithSameNameIndex] = arrayOfFields

        return
      }

      /** Get's the first element with same name and add the new one in an array */
      const arrayOfFields = [currentFieldWithSameName, field]
      fields.current[fieldWithSameNameIndex] = arrayOfFields

      return
    }

    fields.current.push(field)
  }, [])

  const unregisterField = useCallback((fieldName: string) => {
    const fieldIndex = fields.current.findIndex(field => {
      if (Array.isArray(field)) {
        const fieldArrayIndex = field.findIndex(
          currentField => currentField.name === fieldName
        )

        if (fieldArrayIndex > -1) {
          field.splice(fieldArrayIndex, 1)
        }

        return false
      } else {
        return field.name === fieldName
      }
    })

    if (fieldIndex > -1) {
      fields.current.splice(fieldIndex, 1)
    }
  }, [])

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(state => ({ ...state, [fieldName]: undefined }))
  }, [])

  useImperativeHandle<{}, FormHandles>(formRef, () => ({
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName)

      if (!field) {
        return false
      }

      if (Array.isArray(field)) {
        return getFieldsValue(field)
      }

      return getFieldValue(field)
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName)

      if (!field) {
        return false
      }

      if (Array.isArray(field)) {
        return setFieldsValue(field, value)
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

      if (Array.isArray(field)) {
        clearFieldsValue(field)
        return
      }

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

      if (Array.isArray(field)) {
        return field.map(currentField => {
          return currentField.ref
        })
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
