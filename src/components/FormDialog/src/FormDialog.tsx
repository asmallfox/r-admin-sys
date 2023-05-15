import { Modal, Form } from 'antd'
import { isFunction } from '@/utils/is'

import FormItem from './FormItem'
import { useEffect } from 'react'
import { isNil } from '@/utils/is'

interface FormItems {
  key: string
  label?: string
  options?: Array<Record<string, any>>
  tooltip?: string
  attrs?: Record<string, unknown>
  component?: string
}

interface FormDialogProps {
  open: boolean
  formItems: FormItems[]
  title?: string
  onOk?: Function
  onCancel?: Function
  rules?: Record<string, unknown>
  defaultValue?: Record<string, unknown>
}

export default function FormDialog(props: FormDialogProps) {
  const { open, title, onOk, onCancel, rules, formItems, defaultValue } = props

  const [formRef] = Form.useForm()

  async function modalConfirm() {
    try {
      const values = await formRef.validateFields()
      if (isFunction(onOk)) {
        onOk(values, resetFields)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function modalCancel() {
    if (isFunction(onCancel)) {
      onCancel()
    }
  }

  function resetFields() {
    formRef.resetFields()
  }

  useEffect(() => {
    if (open && !isNil(defaultValue)) {
      formRef.setFieldsValue(defaultValue)
    }
  }, [open])

  return (
    <Modal title={title} open={open} onOk={modalConfirm} onCancel={modalCancel}>
      <Form
        labelAlign="right"
        labelCol={{ span: 4 }}
        form={formRef}
        name="subForm"
        className="pt-2"
      >
        {formItems &&
          formItems.map((item) => {
            return (
              <FormItem
                label={item.label}
                name={item.key}
                component={item.component}
                key={item.key}
                tooltip={item.tooltip}
                rules={rules && rules[item.key]}
                options={item.options}
              />
            )
          })}
      </Form>
    </Modal>
  )
}
