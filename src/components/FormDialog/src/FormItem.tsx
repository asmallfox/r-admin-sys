import { Form, Input, Select } from 'antd'

interface FormItemProps {
  label?: string
  name?: string
  component?: string
  attrs?: Record<string, unknown>
  options?: Record<string, unknown>[]
  tooltip?: string
  rules?: Record<string, unknown>
}

export default function FormItem(props: FormItemProps) {
  const { label, name, component, attrs, options = [], tooltip, rules } = props

  function formElement() {
    if (component === 'Select') {
      return <Select options={options} {...attrs} />
    } else {
      return <Input {...attrs} />
    }
  }

  return (
    <Form.Item label={label} name={name} tooltip={tooltip} rules={rules}>
      {formElement()}
    </Form.Item>
  )
}
