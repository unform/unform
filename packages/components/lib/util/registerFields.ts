import { UnformField } from '@unform/core'

type Field = Pick<UnformField, 'getValue' | 'setValue' | 'clearValue'>

interface RegisterFieldType {
  [key: string]: Required<Field>
}

export const registerFields: RegisterFieldType = {
  default: {
    getValue: ref => {
      return ref.current.value
    },
    setValue: (ref, newValue) => {
      ref.current.value = newValue || ''
    },
    clearValue: (ref, newValue) => {
      ref.current.value = newValue || ''
    },
  },
  checkbox: {
    getValue: ref => {
      const { checked, value } = ref.current
      return checked ? value : false
    },
    clearValue: (ref, value) => {
      ref.current.checked = value || false
    },
    setValue: (ref, value) => {
      const checkboxValue = ref.current?.value

      if (Array.isArray(value)) {
        const containValue = value.includes(checkboxValue)
        if (containValue) ref.current.checked = true
      } else if (checkboxValue === value) {
        ref.current.checked = true
      }
    },
  },
  radio: {
    getValue: ref => {
      return ref.current?.checked && ref.current?.value
    },
    clearValue: (ref, value) => {
      ref.current.checked = value || false
    },
    setValue: (ref, value) => {
      const radioValue = ref.current?.value

      if (radioValue === value) {
        ref.current.checked = true
      }
    },
  },
  file: {
    getValue(ref) {
      return ref.current?.files
    },
    clearValue(ref) {
      ref.current.value = ''
    },
    setValue(ref) {
      /**
       * So far, we can't set the value for a `file` input
       * The only way is the user selecting an image or document
       * That's the reason we just return the ref
       */
      return ref
    },
  },
}
