import { NumberFormat, NumberFormatProps } from '@unform/react-number-format'
import { useField } from '@unform/core'

interface Props {
  label: string
}

type ComponentProps = Props & NumberFormatProps

export default function NumberFormatComponent({
  name,
  label,
  ...rest
}: ComponentProps) {
  const { fieldName, error } = useField(name)

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <NumberFormat id={fieldName} name={name} {...rest} />
      {error && <span style={{ color: `red` }}>{error}</span>}
    </div>
  )
}
