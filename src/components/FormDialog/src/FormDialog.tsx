import { Modal, Form, Input, Select } from 'antd'
import { isFunction, isNil } from '@/utils/is'

import FormItemFactory from './FormItemFactory'

interface FormItems {
  key: string
  label?: string | number
  options?: Array<Record<string, any>>
  tooltip?: string
  attrs?: Record<string, unknown>
  component?: string
}

interface FormDialogProps {
  open: boolean
  title?: string
  onCancel?: Function
  rules?: Record<string, unknown>
  formItems: FormItems[]
}

export default function FormDialog(props: FormDialogProps) {
  const { open, title, onCancel, rules, formItems } = props

  const [editForm] = Form.useForm()

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => isFunction(onCancel) && onCancel()}
    >
      <Form
        labelAlign="right"
        labelCol={{ span: 4 }}
        form={editForm}
        name="subForm"
        className="pt-2"
      >
        {formItems &&
          formItems.map((item) => {
            return (
              <Form.Item
                label={item.label}
                name={item.key}
                tooltip={item.tooltip}
                rules={rules && rules[item.key]}
                key={item.key}
              >
                <FormItemFactory {...item} attrs={item} />
              </Form.Item>
            )
          })}
      </Form>
    </Modal>
  )
}
