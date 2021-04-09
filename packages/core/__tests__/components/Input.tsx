import {
  Input as InputComponent,
  InputProps,
} from '../../../components/lib/Input'
import { useField } from '../../lib'

interface Props extends InputProps {
  label?: string
}

export function Input({ name, label, ...rest }: Props) {
  const { fieldName, error, clearError } = useField(name)

  const props = {
    ...rest,
    name,
    id: fieldName,
    'aria-label': fieldName,
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputComponent onFocus={clearError} {...props} />

      {error && <span>{error}</span>}
    </>
  )
}
