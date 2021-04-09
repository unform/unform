import { Input, InputProps } from '@unform/components'
import { useField } from '@unform/core'

interface Props {
  label: string
}

type InputComponentProps = Props & InputProps

export default function InputComponent({
  name,
  label,
  ...rest
}: InputComponentProps) {
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

      <Input onFocus={clearError} {...props} />

      {error && <span>{error}</span>}
    </>
  )
}
